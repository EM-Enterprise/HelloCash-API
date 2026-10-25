import { describe } from '@jest/globals'
import httpRequest from '@/fetch/HttpRequest'

describe('Testing httpRequest function ', () => {
  test('check if it throws an error when the endpoint / api throws an error', async () => {
    await expect(
      httpRequest({
        method: 'GET',
        endpoint: 'https://myhellocash.com/api/v2/invoices',
        authorizationToken: 'No Token',
      }),
    ).rejects.toThrow(Error)

    await expect(
      httpRequest({
        method: 'GET',
        endpoint: 'https://myhellocash.com/api/v2/invoices',
        authorizationToken: 'No Token',
      }),
    ).rejects.toThrow('[Hellocash-API]: An error occurred: Invalid authentication')
  })
})
