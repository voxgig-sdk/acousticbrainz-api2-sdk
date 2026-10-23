package core

import "encoding/json"

type AcousticbrainzApi2Error struct {
	IsAcousticbrainzApi2Error bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewAcousticbrainzApi2Error(code string, msg string, ctx *Context) *AcousticbrainzApi2Error {
	return &AcousticbrainzApi2Error{
		IsAcousticbrainzApi2Error: true,
		Sdk:                "AcousticbrainzApi2",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *AcousticbrainzApi2Error) NotFound() bool {
	return 404 == e.Status
}

func (e *AcousticbrainzApi2Error) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *AcousticbrainzApi2Error) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *AcousticbrainzApi2Error) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
