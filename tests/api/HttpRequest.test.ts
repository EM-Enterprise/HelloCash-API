import { describe } from '@jest/globals'
import httpRequest from '@/api/HttpRequest'
import { RawInvoice } from '@/schemas/invoice/RawInvoice'

describe('Testing httpRequest function ', () => {
  test('check if it throws an error when the endpoint / api throws an error', async () => {
    await expect(
      httpRequest<RawInvoice>({
        endpoint: 'https://api.hellocash.business/api/v1/invoices',
        authorizationToken: 'No Token',
      }),
    ).rejects.toThrow(Error)

    await expect(
      httpRequest<RawInvoice>({
        endpoint: 'https://api.hellocash.business/api/v1/invoices',
        authorizationToken: 'No Token',
      }),
    ).rejects.toThrow('[Hellocash-API]: An error occurred: Invalid authentication')
  })
})
