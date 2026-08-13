# SvobodaWeb SDK exists test

import pytest
from svobodaweb_sdk import SvobodaWebSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SvobodaWebSDK.test(None, None)
        assert testsdk is not None
