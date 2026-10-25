import { getAuthorization } from '@/config/authorization'
import { getDummyInvoice } from '@/schemas/invoice/Invoice'

jest.mock('@/api/invoices/getInvoices', () => ({
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

jest.mock('@/lib/Shared/getUUID', () => ({
  getUUID: jest.fn(() => {
    return '8b2b0fea-e4d6-4ac6-9762-b9a38f8f2d1e'
  }),
}))
