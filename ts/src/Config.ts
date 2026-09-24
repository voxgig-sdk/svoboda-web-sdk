
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SvobodaWeb',
        slug: "svoboda-web",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.svoboda.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        highlight: {
        },
  
    }
  }


  entity = {
    "highlight": {
      "fields": [
        {
          "name": "content",
          "title": "Content",
          "type": "`$STRING`",
          "short": "Content or description of the highlight"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the highlight"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "short": "Timestamp when the highlight was created or updated",
          "format": "date-time"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the highlight"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "URL to the full article or content",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "highlight",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/hljson",
              "segments": [
                {
                  "lit": "hljson"
                }
              ],
              "parts": [
                "hljson"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.highlights`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

