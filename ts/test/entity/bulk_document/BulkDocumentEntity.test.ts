

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AcousticbrainzApi2SDK, BaseFeature, config, stdutil } from '../../..'

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


describe('BulkDocumentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ACOUSTICBRAINZ_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('ACOUSTICBRAINZ_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AcousticbrainzApi2SDK.test()
    const ent = testsdk.BulkDocument()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AcousticbrainzApi2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BulkDocument().load({"map_class":"x","recording_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ACOUSTICBRAINZ_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk_document.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"bulk_document","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /high-level","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"map_class","or":"map_classes","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"recording_id","or":"recording_ids","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/high-level","q":{"exist":["recording_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"high-level"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /low-level","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"feature","or":"features","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"recording_id","or":"recording_ids","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/low-level","q":{"exist":["recording_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"low-level"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bulk_document","name__orig":"bulk_document","Name":"BulkDocument","name_":"bulk_document","name-":"bulk-document","NAME":"BULK_DOCUMENT","index$":1}, {"active":true,"entity":"bulk_document","key$":"BasicBulkDocumentFlow","kind":"basic","name":"BasicBulkDocumentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bulk_document_ref01","srcdatavar":"bulk_document_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bulk_document_ref01"}}],"index$":0}]}, 'BulkDocument', {"GET /high-level":{"protocol":"http","parameters":[{"name":"recording_ids","in":"query","description":"MBIDs in the form mbid[:offset];mbid[:offset]. Maximum 25.","required":true,"schema":{"type":"string"},"index$":0},{"name":"map_classes","in":"query","description":"Return human-readable class names","required":false,"schema":{"type":"boolean"},"index$":1}]},"GET /low-level":{"protocol":"http","parameters":[{"name":"recording_ids","in":"query","description":"MBIDs in the form mbid[:offset];mbid[:offset]. Maximum 25.","required":true,"schema":{"type":"string"},"index$":0},{"name":"features","in":"query","description":"Restrict to specific features, in the form feature1;feature2","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bulk_document_ref01_data = Object.values(setup.data.existing.bulk_document)[0] as any

    // LOAD
    const bulk_document_ref01_ent = client.BulkDocument()
    const bulk_document_ref01_match_dt0: any = {}
    const bulk_document_ref01_data_dt0 = (await bulk_document_ref01_ent.load(bulk_document_ref01_match_dt0)).data()
    assert(null != bulk_document_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bulk_document/BulkDocumentTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AcousticbrainzApi2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bulk_document01','bulk_document02','bulk_document03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID': idmap,
    'ACOUSTICBRAINZ_API2_TEST_LIVE': 'FALSE',
    'ACOUSTICBRAINZ_API2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID']

  const live = 'TRUE' === env.ACOUSTICBRAINZ_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AcousticbrainzApi2SDK(merge([
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
    explain: 'TRUE' === env.ACOUSTICBRAINZ_API2_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
