import { beforeEach, describe } from '@jest/globals'
import GET from '@/api/GET'
import { setAuthorization } from '@/config/authorization'
import { RawInvoices, safeParseRawInvoices } from '@/schemas/invoice/RawInvoices'
import { RawArticles, safeParseRawArticles } from '@/schemas/article/RawArticles'
import { RawCustomers, safeParseRawCustomers } from '@/schemas/customer/RawCustomers'

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
})

describe('Testing #GET function: ', () => {
  test('invoices endpoint should return RawInvoices object', async () => {
    const response = await GET<RawInvoices>('invoices', [`limit=${5}`, 'showDetails=true'])

    expect(safeParseRawInvoices(response).success).toBe(true)
  })

  test('articles endpoint should return RawArticles object', async () => {
    const response = await GET<RawArticles>('articles')

    expect(safeParseRawArticles(response).success).toBe(true)
  })

  test('calling without filter params should yield results anyway', async () => {
    const articles = await GET<RawArticles>('articles')
    expect(articles.articles.length).toBeGreaterThan(0)
  })

  test('validity of customer schema against response of /users endpoint', async () => {
    const customers = await GET<RawCustomers>('users')
    expect(safeParseRawCustomers(customers).success).toBe(true)
  })
})
