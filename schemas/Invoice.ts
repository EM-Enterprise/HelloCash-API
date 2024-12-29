import { z } from 'zod'
import { CustomerSchema } from '@/schemas/Customer'

const InvoiceItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  taxRate: z.number(),
  discount: z.number(),
})

export const InvoiceSchema = z.object({
  system_id: z.unknown(),
  id: z.number(),
  timestamp: z.string(),
  paymentType: z.string(),
  total: z.number(),
  isCanceled: z.boolean(),
  customer: CustomerSchema.optional(),
  items: z.array(InvoiceItemSchema),
})

export const RawInvoiceSchema = z.object({
  invoice_id: z.string(),
  invoice_timestamp: z.string(),
  invoice_number: z.string(),
  invoice_cashier: z.string(),
  invoice_cashier_id: z.string(),
  invoice_mode: z.string(),
  invoice_payment: z.string(),
  invoice_total: z.string(),
  invoice_discount: z.string().optional(),
  invoice_totalNet: z.string(),
  invoice_totalTax: z.string(),
  invoice_text: z.string().optional(),
  invoice_currency: z.string(),
  invoice_cancellation: z.string(),
  company: z.object({
    name: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    postalCode: z.string(),
    city: z.string(),
    email: z.string().optional(),
    website: z.string().optional(),
    phoneNumber: z.string().optional(),
    companyRegister: z.string().optional(),
    iban: z.string().optional(),
    bic: z.string().optional(),
  }),

  items: z.array(
    z.object({
      item_id: z.string(),
      item_quantity: z.string().optional(),
      item_name: z.string(),
      item_price: z.string().optional(),
      item_total: z.string(),
      item_taxRate: z.string().optional(),
      item_discount: z.string(),
      item_discount_unit: z.string().optional(),
      item_discount_value: z.string(),
      item_service_id: z.string(),
      item_article_id: z.string(),
    }),
  ),

  customer: z
    .object({
      customer_id: z.string(),
      customer_salutation: z.string(),
      customer_firstName: z.string(),
      customer_surName: z.string(),
      customer_postalCode: z.string(),
      customer_city: z.string(),
      customer_country: z.string(),
      customer_street: z.string(),
      customer_houseNumber: z.string(),
      customer_email: z.string(),
      customer_phoneNumber: z.string(),
      customer_uid: z.string(),
    })
    .optional(),

  taxes: z.array(
    z.object({
      tax_taxRate: z.string(),
      tax_gross: z.string(),
      tax_net: z.string(),
      tax_tax: z.string(),
    }),
  ),
})

export const RawInvoicesSchema = z.object({
  invoices: z.array(RawInvoiceSchema),
})

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>
export type RawInvoice = z.infer<typeof RawInvoiceSchema>
export type RawInvoices = z.infer<typeof RawInvoicesSchema>
