import { InvoiceDetailResourceSchema } from '@/schemas/invoice/InvoiceDetailResource'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

const InvoiceOutputSchema = z.object({
  link: z.string().nullable(),
  qr: z.string().nullable(),
  text: z.string().nullable(),
  pdf: z.string().nullable(),
  html: z.string().nullable(),
})

export const InvoiceCreatedResourceSchema = z.object({
  data: InvoiceDetailResourceSchema,
  output: InvoiceOutputSchema.nullable(),
})

export type InvoiceCreatedResource = z.infer<typeof InvoiceCreatedResourceSchema>

export const { getDummyInvoiceCreatedResource, safeParseInvoiceCreatedResource, validateInvoiceCreatedResource } = useSchema(InvoiceCreatedResourceSchema, 'InvoiceCreatedResource')
