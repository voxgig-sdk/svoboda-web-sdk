package voxgigsvobodawebsdk

import (
	"github.com/voxgig-sdk/svoboda-web-sdk/go/core"
	"github.com/voxgig-sdk/svoboda-web-sdk/go/entity"
	"github.com/voxgig-sdk/svoboda-web-sdk/go/feature"
	_ "github.com/voxgig-sdk/svoboda-web-sdk/go/utility"
)

// Type aliases preserve external API.
type SvobodaWebSDK = core.SvobodaWebSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SvobodaWebEntity = core.SvobodaWebEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SvobodaWebError = core.SvobodaWebError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewHighlightEntityFunc = func(client *core.SvobodaWebSDK, entopts map[string]any) core.SvobodaWebEntity {
		return entity.NewHighlightEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSvobodaWebSDK = core.NewSvobodaWebSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSvobodaWebSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SvobodaWebSDK  { return NewSvobodaWebSDK(nil) }
func Test() *SvobodaWebSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
