# BulkDocument entity test

import json
import os
import time

import pytest

from acousticbrainzapi2_sdk.utility.voxgig_struct import voxgig_struct as vs
from acousticbrainzapi2_sdk import AcousticbrainzApi2SDK
from acousticbrainzapi2_sdk.core import helpers
from acousticbrainzapi2_sdk.config import shared_config
from acousticbrainzapi2_sdk.feature.base_feature import AcousticbrainzApi2BaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBulkDocumentEntity:

    def test_should_create_instance(self):
        testsdk = AcousticbrainzApi2SDK.test(None, None)
        ent = testsdk.BulkDocument(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = AcousticbrainzApi2SDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.BulkDocument(None).load({"map_class": "x", "recording_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _bulk_document_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "bulk_document." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        bulk_document_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.bulk_document")))
        bulk_document_ref01_data = None
        if len(bulk_document_ref01_data_raw) > 0:
            bulk_document_ref01_data = helpers.to_map(bulk_document_ref01_data_raw[0][1])

        # LOAD
        bulk_document_ref01_ent = client.BulkDocument(None)
        bulk_document_ref01_match_dt0 = {}
        bulk_document_ref01_data_dt0_loaded = bulk_document_ref01_ent.load(bulk_document_ref01_match_dt0, None)
        assert bulk_document_ref01_data_dt0_loaded is not None



def _bulk_document_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/bulk_document/BulkDocumentTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AcousticbrainzApi2SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["bulk_document01", "bulk_document02", "bulk_document03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID": idmap,
        "ACOUSTICBRAINZ_API2_TEST_LIVE": "FALSE",
        "ACOUSTICBRAINZ_API2_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ACOUSTICBRAINZ_API2_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = AcousticbrainzApi2SDK(helpers.to_map(merged_opts))

    _live = env.get("ACOUSTICBRAINZ_API2_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ACOUSTICBRAINZ_API2_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
