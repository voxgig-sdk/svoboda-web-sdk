
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SvobodaWebSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SvobodaWebSDK.test()
    equal(testsdk instanceof SvobodaWebSDK, true,
      'SvobodaWebSDK.test() must return a client synchronously')
  })

})
