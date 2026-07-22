-- SvobodaWeb SDK error

local SvobodaWebError = {}
SvobodaWebError.__index = SvobodaWebError


function SvobodaWebError.new(code, msg, ctx)
  local self = setmetatable({}, SvobodaWebError)
  self.is_sdk_error = true
  self.sdk = "SvobodaWeb"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SvobodaWebError:error()
  return self.msg
end


function SvobodaWebError:__tostring()
  return self.msg
end


return SvobodaWebError
