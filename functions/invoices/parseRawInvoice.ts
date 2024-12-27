import { Invoice, InvoiceItem, RawInvoice } from '@/schemas/Invoice'
import { Customer } from '@/schemas/Customer'

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

/**
 * @internal
 */
export default function parseRawInvoice(invoice: RawInvoice): Invoice {
  return {
    system_id: invoice.invoice_id,
    id: parseInt(invoice.invoice_number),
    timestamp: invoice.invoice_timestamp,
    paymentType: invoice.invoice_payment,
    total: parseFloat(invoice.invoice_total),
    isCanceled: invoice.invoice_cancellation === 'cancelled',
    items:
      invoice.items?.map(
        (i): InvoiceItem => ({
          id: parseInt(i.item_article_id),
          name: i.item_name,
          quantity: parseFloat(i.item_quantity),
          price: parseFloat(i.item_price),
          taxRate: parseFloat(i.item_taxRate),
          discount: parseFloat(i.item_discount_value),
        }),
      ) ?? [],
    customer: parseCustomer(invoice.customer),
  }
}
