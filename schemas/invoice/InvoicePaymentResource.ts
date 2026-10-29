import { DateSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoicePaymentResourceSchema = z.object({
  id: z.number().int(),
  invoice_id: z.number().int(),
  date: DateSchema,
  amount: z.number(),
  payment_method: z.string(),
  notes: z.string(),
})

export type InvoicePaymentResource = z.infer<typeof InvoicePaymentResourceSchema>

export const { safeParseInvoicePaymentResource, validateInvoicePaymentResource, getDummyInvoicePaymentResource } = useSchema(InvoicePaymentResourceSchema, 'InvoicePaymentResource')
