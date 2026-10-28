import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoiceCustomerSchema = z.object({
  id: z.number().int().nullable(),
  name: z.string(),
})

export type InvoiceCustomer = z.infer<typeof InvoiceCustomerSchema>

export const InvoiceResourceSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  invoice_number: z.string().nullable(),
  status: z.string(),
  gross_total: z.number(),
  currency: z.string(),
  paid_amount: z.number().nullable(),
  outstanding_amount: z.number().nullable(),
  payment_status: z.enum(['paid', 'partial', 'unpaid', 'written_off']).nullable(),
  customer: InvoiceCustomerSchema.nullable(),
  items_count: z.string(),
  created_at: DateTimeSchema,
})

export type InvoiceResource = z.infer<typeof InvoiceResourceSchema>

export const { safeParseInvoiceResource, validateInvoiceResource, getDummyInvoiceResource } = useSchema(InvoiceResourceSchema, 'InvoiceResource')
