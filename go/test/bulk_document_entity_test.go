package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/acousticbrainz-api2-sdk/go"
	"github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/core"

	vs "github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const bulk_documentEntityLiveStrict = true


func TestBulkDocumentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BulkDocument(nil)
		if ent == nil {
			t.Fatal("expected non-nil BulkDocumentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BulkDocument(nil).Load(map[string]any{"map_class": "x", "recording_id": "x"}, nil)
		if sdkerr, ok := err.(*core.AcousticbrainzApi2Error); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := bulk_documentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bulk_document." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		bulkDocumentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bulk_document")))
		var bulkDocumentRef01Data map[string]any
		if len(bulkDocumentRef01DataRaw) > 0 {
			bulkDocumentRef01Data = core.ToMapAny(bulkDocumentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bulkDocumentRef01Data

		// LOAD
		bulkDocumentRef01Ent := client.BulkDocument(nil)
		bulkDocumentRef01MatchDt0 := map[string]any{}
		bulkDocumentRef01DataDt0Loaded, err := bulkDocumentRef01Ent.Load(bulkDocumentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if bulkDocumentRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func bulk_documentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bulk_document", "BulkDocumentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bulk_document test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bulk_document test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bulk_document01", "bulk_document02", "bulk_document03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID": idmap,
		"ACOUSTICBRAINZ_API2_TEST_LIVE":      "FALSE",
		"ACOUSTICBRAINZ_API2_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ACOUSTICBRAINZ_API2_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewAcousticbrainzApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["ACOUSTICBRAINZ_API2_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ACOUSTICBRAINZ_API2_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
