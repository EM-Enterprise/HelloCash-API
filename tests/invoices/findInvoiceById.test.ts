import { getInvoices } from '@/functions/invoices/getInvoices'
import * as dotenv from 'dotenv'
import { setAuthorization } from '@/config/authorization'
import findInvoiceById from '@/functions/invoices/findInvoiceById'
import schemaDefaults from '@/schemas/SchemaDefaults'
import { RawInvoicesSchema } from '@/schemas/Invoice'

dotenv.config()

const mockedGet = jest.requireActual('@/api/GET')

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
  jest.spyOn(mockedGet, 'default').mockClear()
})

test('findInvoiceById - check for finding correct invoice', async () => {
  jest.spyOn(mockedGet, 'default').mockImplementation(() => Promise.resolve(schemaDefaults(RawInvoicesSchema)))

  const invoices = await getInvoices(1)
  const fondInvoice = await findInvoiceById(invoices[0].id)

  expect(invoices.length).toBeGreaterThan(0)
  expect(fondInvoice).not.toBeNull()
  expect(fondInvoice?.system_id).toEqual(invoices.at(0)?.system_id)
  expect(mockedGet.default).toHaveBeenCalledTimes(1)
})

test('findInvoiceById - check finding non-existent invoice', async () => {
  jest.spyOn(mockedGet, 'default').mockImplementation(() => {
    return Promise.resolve({
      invoices: [],
    })
  })

  const invoice = await findInvoiceById(1234567890)
  expect(invoice).toBeNull()
})
