# Typed models for the AcousticbrainzApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Between(TypedDict):
    pass


class BetweenLoadMatch(TypedDict):
    metric: str
    recording_id: str


class BulkDocument(TypedDict):
    pass


class BulkDocumentLoadMatchRequired(TypedDict):
    recording_id: str


class BulkDocumentLoadMatch(BulkDocumentLoadMatchRequired, total=False):
    map_class: bool
    feature: str


class Count(TypedDict, total=False):
    count: int
    mbid: str


class CountLoadMatch(TypedDict):
    recording_id: str


class Document(TypedDict):
    pass


class DocumentLoadMatchRequired(TypedDict):
    mbid: str


class DocumentLoadMatch(DocumentLoadMatchRequired, total=False):
    map_class: bool
    n: int


class Similarity(TypedDict, total=False):
    id: str


class SimilarityLoadMatchRequired(TypedDict):
    id: str
    recording_id: str


class SimilarityLoadMatch(SimilarityLoadMatchRequired, total=False):
    n_neighbour: int
    remove_dup: str
    threshold: float
