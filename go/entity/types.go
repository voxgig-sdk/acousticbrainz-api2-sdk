// Typed models for the AcousticbrainzApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/core"
)

// Between is the typed data model for the between entity.
type Between struct {
}

// BetweenLoadMatch is the typed request payload for Between.LoadTyped.
type BetweenLoadMatch struct {
	Metric string `json:"metric"`
	RecordingId string `json:"recording_id"`
}

// BulkDocument is the typed data model for the bulk_document entity.
type BulkDocument struct {
}

// BulkDocumentLoadMatch is the typed request payload for BulkDocument.LoadTyped.
type BulkDocumentLoadMatch struct {
	MapClass *bool `json:"map_class,omitempty"`
	RecordingId string `json:"recording_id"`
	Feature *string `json:"feature,omitempty"`
}

// Count is the typed data model for the count entity.
type Count struct {
}

// CountLoadMatch is the typed request payload for Count.LoadTyped.
type CountLoadMatch struct {
	RecordingId string `json:"recording_id"`
}

// Document is the typed data model for the document entity.
type Document struct {
}

// DocumentLoadMatch is the typed request payload for Document.LoadTyped.
type DocumentLoadMatch struct {
	Mbid string `json:"mbid"`
	MapClass *bool `json:"map_class,omitempty"`
	N *int `json:"n,omitempty"`
}

// Similarity is the typed data model for the similarity entity.
type Similarity struct {
}

// SimilarityLoadMatch is the typed request payload for Similarity.LoadTyped.
type SimilarityLoadMatch struct {
	Id string `json:"id"`
	NNeighbour *int `json:"n_neighbour,omitempty"`
	RecordingId string `json:"recording_id"`
	RemoveDup *string `json:"remove_dup,omitempty"`
	Threshold *float64 `json:"threshold,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
