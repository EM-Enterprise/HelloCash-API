import { describe } from '@jest/globals'
import { getOffers } from '@/src/api/offer/getOffers'
import { setAuthorization } from '@/config/authorization'

describe('Offers: ', () => {
  test('Verify `getOffers` works', async () => {
    setAuthorization(process.env.AUTH_TOKEN!)
    await getOffers()
  })
})
