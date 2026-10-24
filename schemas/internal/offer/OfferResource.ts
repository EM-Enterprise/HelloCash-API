import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const OfferResourceSchema = z.object({
  id: z.number().int(),
  number: z.number().int().nullable(),
  status: z.enum(['open', 'commissioned']),
  remark: z.string().nullable(),
  currency: z.string().nullable(),
  customer_id: z.number().int().nullable(),
  employee_id: z.number().int().nullable(),
  employee_name: z.string().nullable(),
  discount_percent: z.number().int().nullable(),
  discount_amount: z.number(),
  subtotal_net: z.number(),
  subtotal_gross: z.number(),
  net_total: z.number(),
  gross_total: z.number(),
  archived: z.boolean(),
  created_at: DateTimeSchema.nullable(),
  commissioned_at: DateTimeSchema.nullable(),
})

export type OfferResource = z.infer<typeof OfferResourceSchema>
export const { safeParseOfferResource, validateOfferResource } = useSchema(OfferResourceSchema, 'OfferResource')
