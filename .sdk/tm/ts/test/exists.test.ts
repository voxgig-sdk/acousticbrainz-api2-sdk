
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AcousticbrainzApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AcousticbrainzApi2SDK.test()
    equal(testsdk instanceof AcousticbrainzApi2SDK, true,
      'AcousticbrainzApi2SDK.test() must return a client synchronously')
  })

})
