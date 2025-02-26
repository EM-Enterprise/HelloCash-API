import { getAuthorization } from '@/config/authorization'
import { getDummyInvoice } from '@/schemas/invoice/Invoice'

jest.mock('@/functions/invoices/getInvoices', () => ({
  getInvoices: jest.fn((limit: number) => {
    return new Promise((resolve, rejects) => {
      try {
        getAuthorization()
      } catch (err) {
        rejects(err)
      }

      resolve(Array.from({ length: limit === -1 ? 10 : limit }).map(() => getDummyInvoice()))
    })
  }),
}))
