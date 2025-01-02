import { describe } from '@jest/globals'
import { ZodError } from 'zod'
import parseRawInvoice from '@/functions/invoices/parseRawInvoice'
import { RawInvoice } from '@/schemas/invoice/RawInvoice'
import { safeParseInvoice } from '@/schemas/invoice/Invoice'

const dummyRawInvoice: RawInvoice = {
  invoice_id: '1',
  invoice_number: '123',
  invoice_timestamp: '2021-09-01T12:00:00Z',
  invoice_payment: 'Cash',
  invoice_total: '100.00',
  invoice_cancellation: 'not cancelled',
  invoice_cashier: 'John Doe',
  invoice_cashier_id: '1',
  invoice_currency: 'EUR',
  invoice_mode: 'normal',
  invoice_text: 'Some text',
  invoice_totalNet: '80.00',
  invoice_totalTax: '20.00',
  items: [
    {
      item_id: '1',
      item_article_id: '1',
      item_name: 'Item 1',
      item_quantity: '1',
      item_price: '100.00',
      item_taxRate: '20.00',
      item_discount_value: '0.00',
      item_discount: '0.00',
      item_discount_unit: 'percent',
      item_service_id: '1',
      item_total: '100.00',
    },
    {
      item_id: '1',
      item_article_id: '1',
      item_name: 'Item 1',
      item_taxRate: '20.00',
      item_discount_value: '0.00',
      item_discount: '0.00',
      item_service_id: '1',
      item_total: '100.00',
    },
  ],
  customer: {
    customer_id: '1',
    customer_salutation: 'Mr.',
    customer_firstName: 'John',
    customer_surName: 'Doe',
    customer_email: 'somemail@provider.com',
    customer_postalCode: '12345',
    customer_street: 'Street',
    customer_city: 'City',
    customer_country: 'Country',
    customer_houseNumber: '3',
    customer_phoneNumber: '123456789',
    customer_uid: '123456789',
  },
  company: {
    bic: '123456789',
    city: 'City',
    companyRegister: '123456789',
    email: 'email@company.com',
    phoneNumber: '123456789',
    website: 'www.company.com',
    houseNumber: '3',
    iban: 'IBAN123456789',
    name: 'Company',
    postalCode: '12345',
    street: 'Street',
  },
  taxes: [],
}

describe('#ParseRawInvoice - ', () => {
  test('check parsing of valid raw-customer data', () => {
    const rawInvoice = dummyRawInvoice
    const invoice = parseRawInvoice(rawInvoice)

    expect(safeParseInvoice(invoice).success).toBe(true)
  })

  test('should throw an error if the raw invoice is invalid', () => {
    const rawInvoice = {} as RawInvoice
    expect(() => parseRawInvoice(rawInvoice)).toThrow(ZodError)
  })

  test('should parse correctly if optional properties are missing', () => {
    const rawInvoice = dummyRawInvoice as RawInvoice
    delete rawInvoice.customer

    const invoice = parseRawInvoice(rawInvoice)

    expect(safeParseInvoice(invoice).success).toBe(true)
  })
})
