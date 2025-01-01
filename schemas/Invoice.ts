import { z } from 'zod'
import { CustomerSchema } from '@/schemas/customer/Customer'
import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { stripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { RawInvoiceSchema } from '@/schemas/invoice/RawInvoice'

/**
 * @internal
 */
export const InvoiceItemSchema_DefaultValues = z.object({
  id: z.number().default(getRandomNumber()),
  name: z.string().default('Item-' + getRandomNumberAsString()),
  quantity: z.number().default(0),
  price: z.number().default(0),
  taxRate: z.number().default(0),
  discount: z.number().default(0),
})
export const InvoiceItemSchema = stripZodDefault(InvoiceItemSchema_DefaultValues)

/**
 * @internal
 */
export const InvoiceSchema_DefaultValues = z.object({
  system_id: z.unknown().default(getRandomNumberAsString()),
  id: z.number().default(getRandomNumber()),
  timestamp: z.string().default(new Date(Date.parse('2024/12/27')).toISOString()),
  paymentType: z.string().default('PayPal'),
  total: z.number().default(getRandomNumber()),
  isCanceled: z.boolean().default(false),
  customer: CustomerSchema.optional(),
  items: z.array(InvoiceItemSchema),
})
export const InvoiceSchema = stripZodDefault(InvoiceSchema_DefaultValues)

export const RawInvoicesSchema = z.object({
  invoices: z.array(RawInvoiceSchema),
})

export const RawInvoicesSchema_DefaultValues = z.object({
  invoices: z.array(RawInvoiceSchema),
})

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>
export type RawInvoices = z.infer<typeof RawInvoicesSchema>
