
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SvobodaWebSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SvobodaWebSDK.test()
    equal(null !== testsdk, true)
  })

})
