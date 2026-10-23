# AcousticbrainzApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AcousticbrainzApi2Features
  def self.make_feature(name)
    case name
    when "base"
      AcousticbrainzApi2BaseFeature.new
    when "ratelimit"
      AcousticbrainzApi2RatelimitFeature.new
    when "retry"
      AcousticbrainzApi2RetryFeature.new
    when "test"
      AcousticbrainzApi2TestFeature.new
    when "timeout"
      AcousticbrainzApi2TimeoutFeature.new
    else
      AcousticbrainzApi2BaseFeature.new
    end
  end
end
