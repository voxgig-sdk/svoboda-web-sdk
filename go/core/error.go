package core

type SvobodaWebError struct {
	IsSvobodaWebError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSvobodaWebError(code string, msg string, ctx *Context) *SvobodaWebError {
	return &SvobodaWebError{
		IsSvobodaWebError: true,
		Sdk:              "SvobodaWeb",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SvobodaWebError) Error() string {
	return e.Msg
}
