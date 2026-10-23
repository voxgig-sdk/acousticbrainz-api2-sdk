# BulkDocument entity test

require "minitest/autorun"
require "json"
require_relative "../AcousticbrainzApi2_sdk"
require_relative "runner"

class BulkDocumentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AcousticbrainzApi2SDK.test(nil, nil)
    ent = testsdk.BulkDocument(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AcousticbrainzApi2Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AcousticbrainzApi2SDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BulkDocument(nil).load({ "map_class" => "x", "recording_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = bulk_document_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "bulk_document." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    bulk_document_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.bulk_document")))
    bulk_document_ref01_data = nil
    if bulk_document_ref01_data_raw.length > 0
      bulk_document_ref01_data = Helpers.to_map(bulk_document_ref01_data_raw[0][1])
    end

    # LOAD
    bulk_document_ref01_ent = client.BulkDocument(nil)
    bulk_document_ref01_match_dt0 = {}
    bulk_document_ref01_data_dt0_loaded = bulk_document_ref01_ent.load(bulk_document_ref01_match_dt0, nil)
    assert !bulk_document_ref01_data_dt0_loaded.nil?

  end
end

def bulk_document_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "bulk_document", "BulkDocumentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AcousticbrainzApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["bulk_document01", "bulk_document02", "bulk_document03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID" => idmap,
    "ACOUSTICBRAINZ_API2_TEST_LIVE" => "FALSE",
    "ACOUSTICBRAINZ_API2_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ACOUSTICBRAINZ_API2_TEST_BULK_DOCUMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ACOUSTICBRAINZ_API2_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = AcousticbrainzApi2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ACOUSTICBRAINZ_API2_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ACOUSTICBRAINZ_API2_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
