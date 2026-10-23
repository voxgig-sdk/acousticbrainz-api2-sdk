"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BulkDocumentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ACOUSTICBRAINZ_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ACOUSTICBRAINZ_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AcousticbrainzApi2SDK.test();
        const ent = testsdk.BulkDocument();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AcousticbrainzApi2SDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BulkDocument().load({ "map_class": "x", "recording_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ACOUSTICBRAINZ_API2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bulk_document.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "bulk_document", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /high-level", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "map_class", "or": "map_classes", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "recording_id", "or": "recording_ids", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/high-level", "q": { "exist": ["recording_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "high-level" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /low-level", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "feature", "or": "features", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "recording_id", "or": "recording_ids", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/low-level", "q": { "exist": ["recording_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "low-level" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bulk_document", "name__orig": "bulk_document", "Name": "BulkDocument", "name_": "bulk_document", "name-": "bulk-document", "NAME": "BULK_DOCUMENT", "index$": 1 }, { "active": true, "entity": "bulk_document", "key$": "BasicBulkDocumentFlow", "kind": "basic", "name": "BasicBulkDocumentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "bulk_document_ref01", "srcdatavar": "bulk_document_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bulk_document_ref01" } }], "index$": 0 }] }, 'BulkDocument', { "GET /high-level": { "protocol": "http", "parameters": [{ "name": "recording_ids", "in": "query", "description": "MBIDs in the form mbid[:offset];mbid[:offset]. Maximum 25.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "map_classes", "in": "query", "description": "Return human-readable class names", "required": false, "schema": { "type": "boolean" }, "index$": 1 }] }, "GET /low-level": { "protocol": "http", "parameters": [{ "name": "recording_ids", "in": "query", "description": "MBIDs in the form mbid[:offset];mbid[:offset]. Maximum 25.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "features", "in": "query", "description": "Restrict to specific features, in the form feature1;feature2", "required": false, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let bulk_document_ref01_data = Object.values(setup.data.existing.bulk_document)[0];
        // LOAD
        const bulk_document_ref01_ent = client.BulkDocument();
        const bulk_document_ref01_match_dt0 = {};
        const bulk_document_ref01_data_dt0 = (await bulk_document_ref01_ent.load(bulk_document_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != bulk_document_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bulk_document/BulkDocumentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AcousticbrainzApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bulk_document01', 'bulk_document02', 'bulk_document03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID': idmap,
        'ACOUSTICBRAINZ_API2_TEST_LIVE': 'FALSE',
        'ACOUSTICBRAINZ_API2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID'];
    const live = 'TRUE' === env.ACOUSTICBRAINZ_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AcousticbrainzApi2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=BulkDocumentEntity.test.js.map