import { Customer } from '@/schemas/customer/Customer'
import { RawInvoice, validateRawInvoice } from '@/schemas/invoice/RawInvoice'
import { InvoiceItem } from '@/schemas/invoice/InvoiceItem'
import { Invoice } from '@/schemas/invoice/Invoice'

function parseCustomer(rawInvoiceCustomer: RawInvoice['customer']): Customer | undefined {
  if (!rawInvoiceCustomer) return undefined

  return {
    id: rawInvoiceCustomer.customer_id,
    firstName: rawInvoiceCustomer.customer_firstName,
    lastName: rawInvoiceCustomer.customer_surName,
    email: rawInvoiceCustomer.customer_email,
    phone: rawInvoiceCustomer.customer_phoneNumber,
    country: rawInvoiceCustomer.customer_country,
    postCode: rawInvoiceCustomer.customer_postalCode,
    city: rawInvoiceCustomer.customer_city,
    street: rawInvoiceCustomer.customer_street,
    houseNumber: rawInvoiceCustomer.customer_houseNumber,
    uid_number: rawInvoiceCustomer.customer_uid,
  }
}

function parseNumber(value: string | undefined): number {
  if (!value) return -1

  return parseFloat(value)
}

/**
 * @internal
 */
export default function parseRawInvoice(raw: RawInvoice): Invoice {
  const rawInvoice = validateRawInvoice(raw)

  return {
    system_id: rawInvoice.invoice_id,
    id: parseInt(rawInvoice.invoice_number),
    timestamp: rawInvoice.invoice_timestamp,
    paymentType: rawInvoice.invoice_payment,
    total: parseFloat(rawInvoice.invoice_total),
    isCanceled: rawInvoice.invoice_cancellation === 'cancelled',
    items: rawInvoice.items.map(
      (i): InvoiceItem => ({
        id: parseInt(i.item_article_id),
        name: i.item_name,
        quantity: parseNumber(i.item_quantity),
        price: parseNumber(i.item_price),
        taxRate: parseNumber(i.item_taxRate),
        discount: parseNumber(i.item_discount_value),
      }),
    ),
    customer: parseCustomer(rawInvoice.customer),
  }
}
