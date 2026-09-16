

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"content","req":false,"short":"Content or description of the highlight","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the highlight","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"timestamp","req":false,"short":"Timestamp when the highlight was created or updated","type":"`$STRING`","index$":2},{"active":true,"name":"title","req":false,"short":"Title of the highlight","type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the full article or content","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"highlight","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /hljson","json":"{\"operationId\":\"getLiveHighlights\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"highlights\":[{\"content\":\"Latest developments in uncensored news coverage\",\"id\":\"12345\",\"timestamp\":\"2024-01-15T12:30:00Z\",\"title\":\"Breaking News Update\",\"url\":\"https://www.svoboda.org/article/12345\"}]},\"schema\":{\"properties\":{\"highlights\":{\"description\":\"Array of live highlight items\",\"items\":{\"properties\":{\"content\":{\"description\":\"Content or description of the highlight\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the highlight\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Timestamp when the highlight was created or updated\",\"format\":\"date-time\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the highlight\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the full article or content\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with live highlights data\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/hljson","segments":[{"lit":"hljson"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.highlights`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"highlight","name__orig":"highlight","Name":"Highlight","name_":"highlight","name-":"highlight","NAME":"HIGHLIGHT","index$":0}, {"active":true,"entity":"highlight","key$":"BasicHighlightFlow","kind":"basic","name":"BasicHighlightFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"highlight_ref01"}}],"index$":0}]}, 'Highlight')
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
  
