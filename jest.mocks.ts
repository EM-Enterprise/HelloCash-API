// jest.mock(
//   '@/api/GET',
//   () => ({
//     //() => Promise.resolve(Array.from({ length: 10 }).map((): Invoice => schemaDefaults(InvoiceSchema)))
//     // default: jest.fn(),
//     GET: jest.fn(),
//   }),
//   { virtual: true },
// )

import { getAuthorization } from '@/config/authorization'
import schemaDefaults from '@/schemas/SchemaDefaults'
import { InvoiceSchema } from '@/schemas/Invoice'

jest.mock('@/functions/invoices/getInvoices', () => ({
  getInvoices: jest.fn((limit: number) => {
    return new Promise((resolve, rejects) => {
      try {
        getAuthorization()
      } catch (err) {
        rejects(err)
      }

      resolve(Array.from({ length: limit === -1 ? 10 : limit }).map(() => schemaDefaults(InvoiceSchema)))
    })
  }),
}))
