import { getInvoices } from '@/functions/invoices/getInvoices'
import * as dotenv from 'dotenv'
import { setAuthorization } from '@/config/authorization'
import findInvoiceById from '@/functions/invoices/findInvoiceById'

dotenv.config()

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
})

test('findInvoiceById - check for finding correct invoice', async () => {
  const invoices = await getInvoices(1)
  const fondInvoice = await findInvoiceById(invoices[0].id)
  expect(invoices.length).toBeGreaterThan(0)
  expect(fondInvoice).toEqual(invoices[0])
})
