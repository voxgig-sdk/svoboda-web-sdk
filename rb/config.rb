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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "Content or description of the highlight",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the highlight",
              "type" => "`$STRING`",
            },
            {
              "name" => "timestamp",
              "short" => "Timestamp when the highlight was created or updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "short" => "Title of the highlight",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "URL to the full article or content",
              "type" => "`$STRING`",
            },
          ],
          "name" => "highlight",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/hljson",
                  "parts" => [
                    "hljson",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.highlights`",
                  },
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
