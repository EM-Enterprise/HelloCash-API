import { beforeEach, describe } from '@jest/globals'
import { RawInvoices, RawInvoicesSchema } from '@/schemas/Invoice'
import GET from '@/api/GET'
import { setAuthorization } from '@/config/authorization'
import { RawArticles } from '@/schemas/Article'

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
})

describe('Testing #GET function: ', () => {
  test('invoices endpoint should return RawInvoices object', async () => {
    const response = await GET<RawInvoices>('invoices', [`limit=${5}`, 'showDetails=true'])

    expect(RawInvoicesSchema.safeParse(response).success).toBe(true)
  })

  test('calling without filter params should yield results anyway', async () => {
    const articles = await GET<RawArticles>('articles')
    expect(articles.articles.length).toBeGreaterThan(0)
  })
})
