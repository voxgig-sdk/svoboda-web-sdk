# SvobodaWeb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SvobodaWebFeatures
  def self.make_feature(name)
    case name
    when "base"
      SvobodaWebBaseFeature.new
    when "ratelimit"
      SvobodaWebRatelimitFeature.new
    when "retry"
      SvobodaWebRetryFeature.new
    when "test"
      SvobodaWebTestFeature.new
    when "timeout"
      SvobodaWebTimeoutFeature.new
    else
      SvobodaWebBaseFeature.new
    end
  end
end
