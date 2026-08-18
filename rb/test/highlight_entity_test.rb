# Highlight entity test

require "minitest/autorun"
require "json"
require_relative "../SvobodaWeb_sdk"
require_relative "runner"

class HighlightEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SvobodaWebSDK.test(nil, nil)
    ent = testsdk.Highlight(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "highlight" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = SvobodaWebSDK.test(seed, nil)
    seen = base.Highlight(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = SvobodaWebConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = SvobodaWebSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Highlight(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = highlight_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "highlight." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SVOBODA_WEB_TEST_HIGHLIGHT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    highlight_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.highlight")))
    highlight_ref01_data = nil
    if highlight_ref01_data_raw.length > 0
      highlight_ref01_data = Helpers.to_map(highlight_ref01_data_raw[0][1])
    end

    # LIST
    highlight_ref01_ent = client.Highlight(nil)
    highlight_ref01_match = {}

    highlight_ref01_list_result = highlight_ref01_ent.list(highlight_ref01_match, nil)
    assert highlight_ref01_list_result.is_a?(Array)

  end
end

def highlight_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "highlight", "HighlightTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SvobodaWebSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["highlight01", "highlight02", "highlight03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SVOBODA_WEB_TEST_HIGHLIGHT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SVOBODA_WEB_TEST_HIGHLIGHT_ENTID" => idmap,
    "SVOBODA_WEB_TEST_LIVE" => "FALSE",
    "SVOBODA_WEB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SVOBODA_WEB_TEST_HIGHLIGHT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SVOBODA_WEB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = SvobodaWebSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SVOBODA_WEB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SVOBODA_WEB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
