package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBetweenEntityFunc func(client *AcousticbrainzApi2SDK, entopts map[string]any) AcousticbrainzApi2Entity

var NewBulkDocumentEntityFunc func(client *AcousticbrainzApi2SDK, entopts map[string]any) AcousticbrainzApi2Entity

var NewCountEntityFunc func(client *AcousticbrainzApi2SDK, entopts map[string]any) AcousticbrainzApi2Entity

var NewDocumentEntityFunc func(client *AcousticbrainzApi2SDK, entopts map[string]any) AcousticbrainzApi2Entity

var NewSimilarityEntityFunc func(client *AcousticbrainzApi2SDK, entopts map[string]any) AcousticbrainzApi2Entity

