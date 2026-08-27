
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "Content or description of the highlight",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the highlight",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "short": "Timestamp when the highlight was created or updated",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Title of the highlight",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL to the full article or content",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "hljson"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.highlights`"
              }
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
  config
}

