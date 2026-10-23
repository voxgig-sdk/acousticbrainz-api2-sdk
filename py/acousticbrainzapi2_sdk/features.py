# AcousticbrainzApi2 SDK feature factory

from acousticbrainzapi2_sdk.feature.base_feature import AcousticbrainzApi2BaseFeature
from acousticbrainzapi2_sdk.feature.ratelimit_feature import AcousticbrainzApi2RatelimitFeature
from acousticbrainzapi2_sdk.feature.retry_feature import AcousticbrainzApi2RetryFeature
from acousticbrainzapi2_sdk.feature.test_feature import AcousticbrainzApi2TestFeature
from acousticbrainzapi2_sdk.feature.timeout_feature import AcousticbrainzApi2TimeoutFeature


_FEATURES = {
    "base": lambda: AcousticbrainzApi2BaseFeature(),
    "ratelimit": lambda: AcousticbrainzApi2RatelimitFeature(),
    "retry": lambda: AcousticbrainzApi2RetryFeature(),
    "test": lambda: AcousticbrainzApi2TestFeature(),
    "timeout": lambda: AcousticbrainzApi2TimeoutFeature(),
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
