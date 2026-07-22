# SvobodaWeb SDK exists test

require "minitest/autorun"
require_relative "../SvobodaWeb_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SvobodaWebSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
