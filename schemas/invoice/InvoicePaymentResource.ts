import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoicePaymentResourceSchema = z.object({
  id: z.number().int(),
  invoice_id: z.number().int(),
  date: z.iso.date().transform((value) => new Date(`${value}T00:00:00Z`)),
  amount: z.number(),
  payment_method: z.string(),
  notes: z.string(),
})

export type InvoicePaymentResource = z.infer<typeof InvoicePaymentResourceSchema>

export const { safeParseInvoicePaymentResource, validateInvoicePaymentResource, getDummyInvoicePaymentResource } = useSchema(InvoicePaymentResourceSchema, 'InvoicePaymentResource')
