-- Typed models for the AcousticbrainzApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Between

---@class BetweenLoadMatch
---@field metric string
---@field recording_id string

---@class BulkDocument

---@class BulkDocumentLoadMatch
---@field map_class? boolean
---@field recording_id string
---@field feature? string

---@class Count
---@field count? number
---@field mbid? string

---@class CountLoadMatch
---@field recording_id string

---@class Document

---@class DocumentLoadMatch
---@field mbid string
---@field map_class? boolean
---@field n? number

---@class Similarity
---@field id? string

---@class SimilarityLoadMatch
---@field id string
---@field n_neighbour? number
---@field recording_id string
---@field remove_dup? string
---@field threshold? number

local M = {}

return M
