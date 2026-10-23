# AcousticbrainzApi2 SDK utility: make_context
require_relative '../core/context'
module AcousticbrainzApi2Utilities
  MakeContext = ->(ctxmap, basectx) {
    AcousticbrainzApi2Context.new(ctxmap, basectx)
  }
end
