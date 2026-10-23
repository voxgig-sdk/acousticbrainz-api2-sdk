<?php
declare(strict_types=1);

// Typed models for the AcousticbrainzApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Between entity data model. */
class Between
{
}

/** Request payload for Between#load. */
class BetweenLoadMatch
{
    public string $metric;
    public string $recording_id;
}

/** BulkDocument entity data model. */
class BulkDocument
{
}

/** Request payload for BulkDocument#load. */
class BulkDocumentLoadMatch
{
    public ?bool $map_class = null;
    public string $recording_id;
    public ?string $feature = null;
}

/** Count entity data model. */
class Count
{
    public ?int $count = null;
    public ?string $mbid = null;
}

/** Request payload for Count#load. */
class CountLoadMatch
{
    public string $recording_id;
}

/** Document entity data model. */
class Document
{
}

/** Request payload for Document#load. */
class DocumentLoadMatch
{
    public string $mbid;
    public ?bool $map_class = null;
    public ?int $n = null;
}

/** Similarity entity data model. */
class Similarity
{
    public ?string $id = null;
}

/** Request payload for Similarity#load. */
class SimilarityLoadMatch
{
    public string $id;
    public ?int $n_neighbour = null;
    public string $recording_id;
    public ?string $remove_dup = null;
    public ?float $threshold = null;
}

