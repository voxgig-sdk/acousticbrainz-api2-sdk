# AcousticbrainzApi2 SDK exists test

import pytest
from acousticbrainzapi2_sdk import AcousticbrainzApi2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AcousticbrainzApi2SDK.test(None, None)
        assert testsdk is not None
