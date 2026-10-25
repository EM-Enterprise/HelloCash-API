import { ParkedInvoiceResourceSchema } from '@/schemas/invoice-parking/ParkedInvoiceResource'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ParkedInvoiceItemSchema = z.object({
  type: z.string().nullable(),
  article_id: z.number().int().nullable(),
  service_id: z.number().int().nullable(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  tax_rate: z.number(),
  discount_unit: z.string().nullable(),
  discount_value: z.number(),
  note: z.string().nullable(),
  employee_id: z.number().int().nullable(),
  take_away_price: z.number().nullable(),
  take_away_tax: z.number().nullable(),
  gross_total: z.number(),
})

export type ParkedInvoiceItem = z.infer<typeof ParkedInvoiceItemSchema>

export const ParkedInvoiceDetailResourceSchema = ParkedInvoiceResourceSchema.safeExtend({
  items: z.array(ParkedInvoiceItemSchema),
})

export type ParkedInvoiceDetailResource = z.infer<typeof ParkedInvoiceDetailResourceSchema>

export const { getDummyParkedInvoiceDetailResource, safeParseParkedInvoiceDetailResource, validateParkedInvoiceDetailResource } = useSchema(
  ParkedInvoiceDetailResourceSchema,
  'ParkedInvoiceDetailResource',
)
