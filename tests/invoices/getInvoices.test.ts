import { getInvoices } from '@/functions/invoices/getInvoices'
import * as dotenv from 'dotenv'
import { setAuthorization } from '@/config/authorization'

dotenv.config()

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
})

test('getInvoices - limit of 10, Expect 10 invoices', async () => {
  const invoices = await getInvoices(10)
  expect(invoices.length).toBeLessThanOrEqual(10)
})

test('getInvoices - limit of 0, Expect 0 invoices', async () => {
  const invoices = await getInvoices(0)
  expect(invoices).toHaveLength(0)
})

test(
  'getInvoices - limit of 1000, Expect at least 0 invoices',
  async () => {
    const invoices = await getInvoices(1000)
    expect(Array.isArray(invoices)).toBe(true)
    expect(invoices.length).toBeGreaterThan(0)
  },
  10 * 1000,
)

test('getInvoices - limit of -1, Expect at least 0 invoices', async () => {
  const invoices = await getInvoices(-1)
  expect(Array.isArray(invoices)).toBe(true)
  expect(invoices.length).toBeGreaterThan(0)
})

test('getInvoices - No Authentication set; Expect Authentication Failure', async () => {
  setAuthorization(undefined!)
  await expect(getInvoices()).rejects.toThrow(ReferenceError)
  await expect(getInvoices()).rejects.toThrow('Missing Authorization Token. Use setAuthorization() to set the authenticationToken.')
})
