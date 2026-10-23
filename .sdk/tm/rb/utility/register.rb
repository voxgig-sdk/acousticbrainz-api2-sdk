# AcousticbrainzApi2 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AcousticbrainzApi2Utility.registrar = ->(u) {
  u.clean = AcousticbrainzApi2Utilities::Clean
  u.clean_add = AcousticbrainzApi2Utilities::CleanAdd
  u.clean_explain = AcousticbrainzApi2Utilities::CleanExplain
  u.done = AcousticbrainzApi2Utilities::Done
  u.make_error = AcousticbrainzApi2Utilities::MakeError
  u.feature_add = AcousticbrainzApi2Utilities::FeatureAdd
  u.feature_hook = AcousticbrainzApi2Utilities::FeatureHook
  u.feature_init = AcousticbrainzApi2Utilities::FeatureInit
  u.fetcher = AcousticbrainzApi2Utilities::Fetcher
  u.make_fetch_def = AcousticbrainzApi2Utilities::MakeFetchDef
  u.make_context = AcousticbrainzApi2Utilities::MakeContext
  u.make_options = AcousticbrainzApi2Utilities::MakeOptions
  u.make_request = AcousticbrainzApi2Utilities::MakeRequest
  u.make_response = AcousticbrainzApi2Utilities::MakeResponse
  u.make_result = AcousticbrainzApi2Utilities::MakeResult
  u.make_point = AcousticbrainzApi2Utilities::MakePoint
  u.make_spec = AcousticbrainzApi2Utilities::MakeSpec
  u.make_url = AcousticbrainzApi2Utilities::MakeUrl
  u.param = AcousticbrainzApi2Utilities::Param
  u.prepare_auth = AcousticbrainzApi2Utilities::PrepareAuth
  u.prepare_body = AcousticbrainzApi2Utilities::PrepareBody
  u.prepare_headers = AcousticbrainzApi2Utilities::PrepareHeaders
  u.prepare_method = AcousticbrainzApi2Utilities::PrepareMethod
  u.prepare_params = AcousticbrainzApi2Utilities::PrepareParams
  u.prepare_path = AcousticbrainzApi2Utilities::PreparePath
  u.prepare_query = AcousticbrainzApi2Utilities::PrepareQuery
  u.graphql_body = AcousticbrainzApi2Utilities::GraphqlBody
  u.graphql_errors = AcousticbrainzApi2Utilities::GraphqlErrors
  u.result_basic = AcousticbrainzApi2Utilities::ResultBasic
  u.result_body = AcousticbrainzApi2Utilities::ResultBody
  u.result_headers = AcousticbrainzApi2Utilities::ResultHeaders
  u.transform_request = AcousticbrainzApi2Utilities::TransformRequest
  u.transform_response = AcousticbrainzApi2Utilities::TransformResponse
}
