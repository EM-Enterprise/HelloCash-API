import { Invoice, Item, RawInvoices } from '@/typings/Invoice'
import { Customer } from '@/typings/Customer'

/**
 * @internal
 */
export default function parseInvoice(invoice: RawInvoices['invoices'][number]): Invoice {
  const parseCustomer = ({ customer }: RawInvoices['invoices'][number]): Customer | undefined => {
    if (!customer) return undefined

    return {
      id: customer.customer_id,
      timestamp: null,
      salutation: null,
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
      company: null,
      notes: null,
      birthday: null,
    }
  }

  return {
    _id: invoice.invoice_id,
    id: parseInt(invoice.invoice_number),
    timestamp: new Date(Date.parse(invoice.invoice_timestamp)),
    paymentType: invoice.invoice_payment,
    total: parseFloat(invoice.invoice_total),
    isCanceled: invoice.invoice_cancellation === 'cancelled',
    items:
      invoice.items?.map(
        (i): Item => ({
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
