import { describe } from '@jest/globals'
import parseRawCustomer from '@/functions/customers/parseRawCustomer'
import { ZodError } from 'zod'
import { getDummyRawCustomer, RawCustomer } from '@/schemas/customer/RawCustomer'
import { safeParseCustomer } from '@/schemas/customer/Customer'
import getOffers from '@/functions/offer/getOffers'
import { setAuthorization } from '@/config/authorization'

describe('Offers: ', () => {
  test('Verify `getOffers` works', async () => {
    setAuthorization(process.env.AUTH_TOKEN!)
    await getOffers()
  })
})
