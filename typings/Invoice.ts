import { Customer } from "./Customer"

export interface RawInvoices {
  invoices: Array<{
    invoice_id: string,
    invoice_timestamp: string,
    invoice_number: string,
    invoice_cashier: string,
    invoice_cashier_id: string,
    invoice_mode: string,
    invoice_payment: string,
    invoice_total: string,
    invoice_totalNet: string,
    invoice_totalTax: string,
    invoice_text: string,
    invoice_currency: string,
    invoice_cancellation: string,
    company: {
      name: string,
      street: string,
      houseNumber: string,
      postalCode: string,
      city: string,
      email: string,
      website: string,
      phoneNumber: string,
      companyRegister: string,
      iban: string,
      bic: string
    },
    items: Array<{
      item_id: string,
      item_quantity: string,
      item_name: string,
      item_price: string,
      item_total: string,
      item_taxRate: string,
      item_discount: string,
      item_discount_unit: string,
      item_discount_value: string,
      item_service_id: string,
      item_article_id: string
    }>,
    customer?: {
      customer_id: string,
      customer_salutation: string,
      customer_firstName: string,
      customer_surName: string,
      customer_postalCode: string,
      customer_city: string,
      customer_country: string,
      customer_street: string,
      customer_houseNumber: string,
      customer_email: string,
      customer_phoneNumber: string,
      customer_uid: string
    },
    taxes: Array<{
      item_id: string,
      item_quantity: string,
      item_name: string,
      item_price: string,
      item_total: string,
      item_taxRate: string,
      item_discount: string,
      item_discount_unit: string,
      item_discount_value: string,
      item_service_id: string,
      item_article_id: string
    }>
  }>
}

export interface Invoice {
  _id: string | number,
  id: number,
  timestamp: Date,
  paymentType: string,
  total: number,
  isCanceled: boolean,
  customer?: Customer,
  items: Array<Item>
}



export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
  taxRate: number,
  discount: number,
}