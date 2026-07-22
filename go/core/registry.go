package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewHighlightEntityFunc func(client *SvobodaWebSDK, entopts map[string]any) SvobodaWebEntity

