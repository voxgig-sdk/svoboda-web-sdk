# SvobodaWeb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SvobodaWebFeatures
  def self.make_feature(name)
    case name
    when "base"
      SvobodaWebBaseFeature.new
    when "test"
      SvobodaWebTestFeature.new
    else
      SvobodaWebBaseFeature.new
    end
  end
end
