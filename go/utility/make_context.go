package utility

import "github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/core"

func makeContextUtil(ctxmap map[string]any, basectx *core.Context) *core.Context {
	return core.NewContext(ctxmap, basectx)
}
