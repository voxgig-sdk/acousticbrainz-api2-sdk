# AcousticbrainzApi2 SDK exists test

require "minitest/autorun"
require_relative "../AcousticbrainzApi2_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AcousticbrainzApi2SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
