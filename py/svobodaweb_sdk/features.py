# SvobodaWeb SDK feature factory

from svobodaweb_sdk.feature.base_feature import SvobodaWebBaseFeature
from svobodaweb_sdk.feature.ratelimit_feature import SvobodaWebRatelimitFeature
from svobodaweb_sdk.feature.retry_feature import SvobodaWebRetryFeature
from svobodaweb_sdk.feature.test_feature import SvobodaWebTestFeature
from svobodaweb_sdk.feature.timeout_feature import SvobodaWebTimeoutFeature


_FEATURES = {
    "base": lambda: SvobodaWebBaseFeature(),
    "ratelimit": lambda: SvobodaWebRatelimitFeature(),
    "retry": lambda: SvobodaWebRetryFeature(),
    "test": lambda: SvobodaWebTestFeature(),
    "timeout": lambda: SvobodaWebTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
