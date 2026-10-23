

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


describe('CountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ACOUSTICBRAINZ_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('ACOUSTICBRAINZ_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AcousticbrainzApi2SDK.test()
    const ent = testsdk.Count()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AcousticbrainzApi2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Count().load({"recording_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ACOUSTICBRAINZ_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'count.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"count":{"a":true,"h":"Count","n":"count","r":false,"t":"`$INTEGER`","key$":"count","index$":0},"mbid":{"a":true,"fo":"uuid","h":"Mbid","n":"mbid","r":false,"t":"`$STRING`","key$":"mbid","index$":1}},"name":"count","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{mbid}/count","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"mbid","or":"mbid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{mbid}/count","q":{"exist":["mbid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"var":"mbid"},{"lit":"count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /count","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"recording_id","or":"recording_ids","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/count","q":{"exist":["recording_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"count","name__orig":"count","Name":"Count","name_":"count","name-":"count","NAME":"COUNT","index$":2}, {"active":true,"entity":"count","key$":"BasicCountFlow","kind":"basic","name":"BasicCountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"count_ref01","srcdatavar":"count_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-count_ref01"}}],"index$":0}]}, 'Count', {"GET /{mbid}/count":{"protocol":"http","parameters":[{"name":"mbid","in":"path","description":"MusicBrainz Recording ID","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}]},"GET /count":{"protocol":"http","parameters":[{"name":"recording_ids","in":"query","description":"MBIDs in the form mbid;mbid. Maximum 25.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let count_ref01_data = Object.values(setup.data.existing.count)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const count_ref01_ent = client.Count()


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
      '../../../../.sdk/test/entity/count/CountTestData.json')

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
    ['count01','count02','count03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ACOUSTICBRAINZ_API2_TEST_COUNT_ENTID': idmap,
    'ACOUSTICBRAINZ_API2_TEST_LIVE': 'FALSE',
    'ACOUSTICBRAINZ_API2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ACOUSTICBRAINZ_API2_TEST_COUNT_ENTID']

  const live = 'TRUE' === env.ACOUSTICBRAINZ_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ACOUSTICBRAINZ_API2_TEST_COUNT_ENTID']
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
  
