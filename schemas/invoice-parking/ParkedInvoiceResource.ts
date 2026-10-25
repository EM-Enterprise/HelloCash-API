import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ParkedInvoiceResourceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  reference: z.boolean(),
  discount_percent: z.number().int(),
  positions_count: z.number().int(),
  total_gross: z.number().nullable(),
  updated_at: DateTimeSchema,
})

export type ParkedInvoiceResource = z.infer<typeof ParkedInvoiceResourceSchema>

export const { getDummyParkedInvoiceResource, safeParseParkedInvoiceResource, validateParkedInvoiceResource } = useSchema(ParkedInvoiceResourceSchema, 'ParkedInvoiceResource')
