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
(0, node_test_1.describe)('HighlightEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SVOBODA_WEB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SVOBODA_WEB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SvobodaWebSDK.test();
        const ent = testsdk.Highlight();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SVOBODA_WEB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'highlight.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "content": { "a": true, "h": "Content", "n": "content", "r": false, "sh": "Content or description of the highlight", "t": "`$STRING`", "key$": "content", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the highlight", "t": "`$STRING`", "key$": "id", "index$": 1 }, "timestamp": { "a": true, "fo": "date-time", "h": "Timestamp", "n": "timestamp", "r": false, "sh": "Timestamp when the highlight was created or updated", "t": "`$STRING`", "key$": "timestamp", "index$": 2 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Title of the highlight", "t": "`$STRING`", "key$": "title", "index$": 3 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "URL to the full article or content", "t": "`$STRING`", "key$": "url", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "highlight", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /hljson", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/hljson", "q": {}, "r": {}, "s": [{ "lit": "hljson" }], "t": { "req": "`reqdata`", "res": "`body.highlights`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "highlight", "name__orig": "highlight", "Name": "Highlight", "name_": "highlight", "name-": "highlight", "NAME": "HIGHLIGHT", "index$": 0 }, { "active": true, "entity": "highlight", "key$": "BasicHighlightFlow", "kind": "basic", "name": "BasicHighlightFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "highlight_ref01" } }], "index$": 0 }] }, 'Highlight', { "GET /hljson": { "protocol": "http", "operationId": "getLiveHighlights", "responses": { "200": { "description": "Successful response with live highlights data", "content": { "application/json": { "schema": { "type": "object", "properties": { "highlights": { "description": "Array of live highlight items", "items": { "properties": { "content": { "description": "Content or description of the highlight", "type": "string", "key$": "content" }, "id": { "description": "Unique identifier for the highlight", "type": "string", "key$": "id" }, "timestamp": { "description": "Timestamp when the highlight was created or updated", "format": "date-time", "type": "string", "key$": "timestamp" }, "title": { "description": "Title of the highlight", "type": "string", "key$": "title" }, "url": { "description": "URL to the full article or content", "format": "uri", "type": "string", "key$": "url" } }, "type": "object", "index$": 0 }, "key$": "highlights", "type": "array" } } }, "example": { "highlights": [{ "id": "12345", "title": "Breaking News Update", "content": "Latest developments in uncensored news coverage", "timestamp": "2024-01-15T12:30:00Z", "url": "https://www.svoboda.org/article/12345" }] } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let highlight_ref01_data = Object.values(setup.data.existing.highlight)[0];
        // LIST
        const highlight_ref01_ent = client.Highlight();
        const highlight_ref01_match = {};
        const highlight_ref01_list = (await highlight_ref01_ent.list(highlight_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/highlight/HighlightTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SvobodaWebSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['highlight01', 'highlight02', 'highlight03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SVOBODA_WEB_TEST_HIGHLIGHT_ENTID': idmap,
        'SVOBODA_WEB_TEST_LIVE': 'FALSE',
        'SVOBODA_WEB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SVOBODA_WEB_TEST_HIGHLIGHT_ENTID'];
    const live = 'TRUE' === env.SVOBODA_WEB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SVOBODA_WEB_TEST_HIGHLIGHT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SvobodaWebSDK(merge([
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
        explain: 'TRUE' === env.SVOBODA_WEB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=HighlightEntity.test.js.map