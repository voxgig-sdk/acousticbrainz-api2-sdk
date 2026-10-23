# frozen_string_literal: true

# Typed models for the AcousticbrainzApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Between entity data model.
class Between
end

# Request payload for Between#load.
#
# @!attribute [rw] metric
#   @return [String]
#
# @!attribute [rw] recording_id
#   @return [String]
BetweenLoadMatch = Struct.new(
  :metric,
  :recording_id,
  keyword_init: true
)

# BulkDocument entity data model.
class BulkDocument
end

# Request payload for BulkDocument#load.
#
# @!attribute [rw] map_class
#   @return [Boolean, nil]
#
# @!attribute [rw] recording_id
#   @return [String]
#
# @!attribute [rw] feature
#   @return [String, nil]
BulkDocumentLoadMatch = Struct.new(
  :map_class,
  :recording_id,
  :feature,
  keyword_init: true
)

# Count entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] mbid
#   @return [String, nil]
Count = Struct.new(
  :count,
  :mbid,
  keyword_init: true
)

# Request payload for Count#load.
#
# @!attribute [rw] recording_id
#   @return [String]
CountLoadMatch = Struct.new(
  :recording_id,
  keyword_init: true
)

# Document entity data model.
class Document
end

# Request payload for Document#load.
#
# @!attribute [rw] mbid
#   @return [String]
#
# @!attribute [rw] map_class
#   @return [Boolean, nil]
#
# @!attribute [rw] n
#   @return [Integer, nil]
DocumentLoadMatch = Struct.new(
  :mbid,
  :map_class,
  :n,
  keyword_init: true
)

# Similarity entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Similarity = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Similarity#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] n_neighbour
#   @return [Integer, nil]
#
# @!attribute [rw] recording_id
#   @return [String]
#
# @!attribute [rw] remove_dup
#   @return [String, nil]
#
# @!attribute [rw] threshold
#   @return [Float, nil]
SimilarityLoadMatch = Struct.new(
  :id,
  :n_neighbour,
  :recording_id,
  :remove_dup,
  :threshold,
  keyword_init: true
)

