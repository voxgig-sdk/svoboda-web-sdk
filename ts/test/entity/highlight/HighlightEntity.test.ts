

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SvobodaWebSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('HighlightEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SVOBODA_WEB_TEST_LIVE=TRUE.
  afterEach(liveDelay('SVOBODA_WEB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SvobodaWebSDK.test()
    const ent = testsdk.Highlight()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SVOBODA_WEB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'highlight.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content":{"a":true,"h":"Content","n":"content","r":false,"sh":"Content or description of the highlight","t":"`$STRING`","key$":"content","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the highlight","t":"`$STRING`","key$":"id","index$":1},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"sh":"Timestamp when the highlight was created or updated","t":"`$STRING`","key$":"timestamp","index$":2},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the highlight","t":"`$STRING`","key$":"title","index$":3},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the full article or content","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"highlight","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /hljson","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/hljson","q":{},"r":{},"s":[{"lit":"hljson"}],"t":{"req":"`reqdata`","res":"`body.highlights`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"highlight","name__orig":"highlight","Name":"Highlight","name_":"highlight","name-":"highlight","NAME":"HIGHLIGHT","index$":0}, {"active":true,"entity":"highlight","key$":"BasicHighlightFlow","kind":"basic","name":"BasicHighlightFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"highlight_ref01"}}],"index$":0}]}, 'Highlight', {"GET /hljson":{"protocol":"http","operationId":"getLiveHighlights","responses":{"200":{"description":"Successful response with live highlights data","content":{"application/json":{"schema":{"type":"object","properties":{"highlights":{"description":"Array of live highlight items","items":{"properties":{"content":{"description":"Content or description of the highlight","type":"string","key$":"content"},"id":{"description":"Unique identifier for the highlight","type":"string","key$":"id"},"timestamp":{"description":"Timestamp when the highlight was created or updated","format":"date-time","type":"string","key$":"timestamp"},"title":{"description":"Title of the highlight","type":"string","key$":"title"},"url":{"description":"URL to the full article or content","format":"uri","type":"string","key$":"url"}},"type":"object","index$":0},"key$":"highlights","type":"array"}}},"example":{"highlights":[{"id":"12345","title":"Breaking News Update","content":"Latest developments in uncensored news coverage","timestamp":"2024-01-15T12:30:00Z","url":"https://www.svoboda.org/article/12345"}]}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let highlight_ref01_data = Object.values(setup.data.existing.highlight)[0] as any

    // LIST
    const highlight_ref01_ent = client.Highlight()
    const highlight_ref01_match: any = {}

    const highlight_ref01_list = (await highlight_ref01_ent.list(highlight_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/highlight/HighlightTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SvobodaWebSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['highlight01','highlight02','highlight03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SVOBODA_WEB_TEST_HIGHLIGHT_ENTID': idmap,
    'SVOBODA_WEB_TEST_LIVE': 'FALSE',
    'SVOBODA_WEB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SVOBODA_WEB_TEST_HIGHLIGHT_ENTID']

  const live = 'TRUE' === env.SVOBODA_WEB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SVOBODA_WEB_TEST_HIGHLIGHT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SvobodaWebSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SVOBODA_WEB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
