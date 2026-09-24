# SvobodaWeb SDK configuration

module SvobodaWebConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SvobodaWeb",
        "slug" => "svoboda-web",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.svoboda.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "highlight" => {},
        },
      },
      "entity" => {
        "highlight" => {
          "fields" => [
            {
              "name" => "content",
              "title" => "Content",
              "type" => "`$STRING`",
              "short" => "Content or description of the highlight",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the highlight",
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$STRING`",
              "short" => "Timestamp when the highlight was created or updated",
              "format" => "date-time",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "Title of the highlight",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "URL to the full article or content",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "highlight",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/hljson",
                  "segments" => [
                    {
                      "lit" => "hljson",
                    },
                  ],
                  "parts" => [
                    "hljson",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.highlights`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SvobodaWebFeatures.make_feature(name)
  end
end
