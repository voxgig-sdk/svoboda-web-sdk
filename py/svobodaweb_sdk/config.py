# SvobodaWeb SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SvobodaWeb",
            "slug": "svoboda-web",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.svoboda.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "highlight": {},
            },
        },
        "entity": {
      "highlight": {
        "fields": [
          {
            "name": "content",
            "short": "Content or description of the highlight",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the highlight",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "timestamp",
            "short": "Timestamp when the highlight was created or updated",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the highlight",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "URL to the full article or content",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "highlight",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/hljson",
                "segments": [
                  {
                    "lit": "hljson",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.highlights`",
                },
                "parts": [
                  "hljson",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
