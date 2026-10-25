import { InvoiceResourceSchema } from '@/schemas/invoice/InvoiceResource'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

const InvoiceCustomerSchema = z.object({
  id: z.number().int().nullable(),
  name: z.string(),
  salutation: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
  postal_code: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  email: z.string().nullable(),
  phone_number: z.string().nullable(),
  uid_number: z.string().nullable(),
})

export type InvoiceCustomer = z.infer<typeof InvoiceCustomerSchema>

const InvoiceCompanySchema = z.object({
  name: z.string(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
  postal_code: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  phone_number: z.string().nullable(),
  uid_number: z.string().nullable(),
  iban: z.string().nullable(),
  bic: z.string().nullable(),
})

export type InvoiceCompany = z.infer<typeof InvoiceCompanySchema>

const InvoiceTaxBenefitSchema = z.object({
  type: z.enum(['none', 'small_business', 'differential_taxation', 'other']),
  text: z.string().nullable(),
})

const InvoiceTaxSchema = z.object({
  rate: z.number(),
  gross: z.number(),
  net: z.number(),
  tax: z.number(),
})

const InvoiceWriteoffSchema = z.object({
  year: z.number().int(),
  reason: z.string(),
})

const InvoiceCorrectionSchema = z.object({
  number: z.number().int(),
  datetime: DateTimeSchema.nullable(),
  reason: z.string().nullable(),

  // The employee object's fields are collapsed
  // in the supplied documentation.
  employee: z.record(z.string(), z.unknown()).nullable(),
})

export const InvoiceItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  gross_unit_price: z.number(),
  total: z.number(),
  tax_rate: z.number(),

  // Object structure not visible in the screenshot.
  discount: z.record(z.string(), z.unknown()),

  service_id: z.number().int().nullable(),
  article_id: z.number().int().nullable(),
  foreign_category: z.string().nullable(),
})

const InvoicePaymentMethodSchema = z.object({
  name: z.string(),
  total: z.number(),
})

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>
export type InvoiceTax = z.infer<typeof InvoiceTaxSchema>
export type InvoicePaymentMethod = z.infer<typeof InvoicePaymentMethodSchema>

const InvoiceSignatureSchema = z.object({
  qr_code_data: z.string().nullable(),
  text: z.string().nullable(),
  additional_text: z.string().nullable(),

  // Nested array/object definitions are not visible.
  receipt_lines: z.array(z.unknown()).nullable(),
  cancellation: z.record(z.string(), z.unknown()).nullable(),
})

export type InvoiceSignature = z.infer<typeof InvoiceSignatureSchema>

export const InvoiceDetailResourceSchema = z.object({
  id: z.number().int(),
  type: z.enum(['invoice', 'cancellation']),
  invoice_number: z.string().nullable(),
  status: z.enum(['draft', 'completed', 'cancelled']),
  mode: z.enum(['default', 'test', 'demo']),

  gross_total: z.number(),
  currency: z.string(),
  tax_total: z.number(),
  net_total: z.number(),
  tip: z.number(),
  discount_amount: z.number().nullable(),

  note: z.string().nullable(),
  has_reference: z.boolean(),
  small_business: z.boolean(),
  differential_taxation: z.boolean(),

  tax_benefit: InvoiceTaxBenefitSchema,
  taxes: z.array(InvoiceTaxSchema),

  paid_amount: z.number().nullable(),
  outstanding_amount: z.number().nullable(),
  payment_status: InvoiceResourceSchema.shape.payment_status,

  written_off: InvoiceWriteoffSchema.nullable(),
  correction: InvoiceCorrectionSchema.nullable(),

  customer: InvoiceCustomerSchema.nullable(),
  company: InvoiceCompanySchema,

  items: z.array(InvoiceItemSchema),
  payment_methods: z.array(InvoicePaymentMethodSchema),

  signature: InvoiceSignatureSchema.nullable(),

  created_at: DateTimeSchema,
})

export type InvoiceDetailResource = z.infer<typeof InvoiceDetailResourceSchema>

export const { safeParseInvoiceDetailResource, validateInvoiceDetailResource, getDummyInvoiceDetailResource } = useSchema(InvoiceDetailResourceSchema, 'InvoiceDetailResource')
