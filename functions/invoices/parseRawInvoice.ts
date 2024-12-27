import { Invoice, InvoiceItem, RawInvoice } from '@/schemas/Invoice'
import { Customer } from '@/schemas/Customer'

/**
 * @internal
 */
export default function parseRawInvoice(invoice: RawInvoice): Invoice {
  const parseCustomer = ({ customer }: RawInvoice): Customer | undefined => {
    if (!customer) return undefined

    return {
      id: customer.customer_id,
      firstName: customer.customer_firstName,
      lastName: customer.customer_surName,
      email: customer.customer_email,
      phone: customer.customer_phoneNumber,
      country: customer.customer_country,
      postCode: customer.customer_postalCode,
      city: customer.customer_city,
      street: customer.customer_street,
      houseNumber: customer.customer_houseNumber,
      uid_number: customer.customer_uid,
    }
  }

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
    customer: parseCustomer(invoice),
  }
}
