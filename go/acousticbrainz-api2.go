package voxgigacousticbrainzapi2sdk

import (
	"github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/core"
	"github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/entity"
	"github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/feature"
	_ "github.com/voxgig-sdk/acousticbrainz-api2-sdk/go/utility"
)

// Type aliases preserve external API.
type AcousticbrainzApi2SDK = core.AcousticbrainzApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AcousticbrainzApi2Entity = core.AcousticbrainzApi2Entity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AcousticbrainzApi2Error = core.AcousticbrainzApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBetweenEntityFunc = func(client *core.AcousticbrainzApi2SDK, entopts map[string]any) core.AcousticbrainzApi2Entity {
		return entity.NewBetweenEntity(client, entopts)
	}
	core.NewBulkDocumentEntityFunc = func(client *core.AcousticbrainzApi2SDK, entopts map[string]any) core.AcousticbrainzApi2Entity {
		return entity.NewBulkDocumentEntity(client, entopts)
	}
	core.NewCountEntityFunc = func(client *core.AcousticbrainzApi2SDK, entopts map[string]any) core.AcousticbrainzApi2Entity {
		return entity.NewCountEntity(client, entopts)
	}
	core.NewDocumentEntityFunc = func(client *core.AcousticbrainzApi2SDK, entopts map[string]any) core.AcousticbrainzApi2Entity {
		return entity.NewDocumentEntity(client, entopts)
	}
	core.NewSimilarityEntityFunc = func(client *core.AcousticbrainzApi2SDK, entopts map[string]any) core.AcousticbrainzApi2Entity {
		return entity.NewSimilarityEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAcousticbrainzApi2SDK = core.NewAcousticbrainzApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAcousticbrainzApi2SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AcousticbrainzApi2SDK  { return NewAcousticbrainzApi2SDK(nil) }
func Test() *AcousticbrainzApi2SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
