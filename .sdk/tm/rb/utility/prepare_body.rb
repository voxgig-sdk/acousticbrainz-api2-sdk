# AcousticbrainzApi2 SDK utility: prepare_body
require_relative 'media'
module AcousticbrainzApi2Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AcousticbrainzApi2Utilities.raw_body(ctx.reqdata) if AcousticbrainzApi2Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
