# SvobodaWeb SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SvobodaWebUtility.registrar = ->(u) {
  u.clean = SvobodaWebUtilities::Clean
  u.done = SvobodaWebUtilities::Done
  u.make_error = SvobodaWebUtilities::MakeError
  u.feature_add = SvobodaWebUtilities::FeatureAdd
  u.feature_hook = SvobodaWebUtilities::FeatureHook
  u.feature_init = SvobodaWebUtilities::FeatureInit
  u.fetcher = SvobodaWebUtilities::Fetcher
  u.make_fetch_def = SvobodaWebUtilities::MakeFetchDef
  u.make_context = SvobodaWebUtilities::MakeContext
  u.make_options = SvobodaWebUtilities::MakeOptions
  u.make_request = SvobodaWebUtilities::MakeRequest
  u.make_response = SvobodaWebUtilities::MakeResponse
  u.make_result = SvobodaWebUtilities::MakeResult
  u.make_point = SvobodaWebUtilities::MakePoint
  u.make_spec = SvobodaWebUtilities::MakeSpec
  u.make_url = SvobodaWebUtilities::MakeUrl
  u.param = SvobodaWebUtilities::Param
  u.prepare_auth = SvobodaWebUtilities::PrepareAuth
  u.prepare_body = SvobodaWebUtilities::PrepareBody
  u.prepare_headers = SvobodaWebUtilities::PrepareHeaders
  u.prepare_method = SvobodaWebUtilities::PrepareMethod
  u.prepare_params = SvobodaWebUtilities::PrepareParams
  u.prepare_path = SvobodaWebUtilities::PreparePath
  u.prepare_query = SvobodaWebUtilities::PrepareQuery
  u.result_basic = SvobodaWebUtilities::ResultBasic
  u.result_body = SvobodaWebUtilities::ResultBody
  u.result_headers = SvobodaWebUtilities::ResultHeaders
  u.transform_request = SvobodaWebUtilities::TransformRequest
  u.transform_response = SvobodaWebUtilities::TransformResponse
}
