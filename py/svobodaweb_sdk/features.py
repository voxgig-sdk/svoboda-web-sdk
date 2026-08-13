# SvobodaWeb SDK feature factory

from svobodaweb_sdk.feature.base_feature import SvobodaWebBaseFeature
from svobodaweb_sdk.feature.test_feature import SvobodaWebTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SvobodaWebBaseFeature(),
        "test": lambda: SvobodaWebTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
