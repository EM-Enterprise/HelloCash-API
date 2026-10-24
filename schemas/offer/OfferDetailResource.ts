import { OfferResourceSchema } from '@/schemas/offer/OfferResource'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const OfferItemSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  quantity: z.number(),
  price: z.number(),
  net_price: z.number(),
  tax_rate: z.number(),
  discount_unit: z.enum(['percent', 'absolute']).nullable(),
  discount_value: z.number(),
  article_id: z.number().int().nullable(),
  service_id: z.number().int().nullable(),
  type: z.enum(['article', 'service']).nullable(),
})

export type OfferItem = z.infer<typeof OfferItemSchema>

export const OfferTaxSchema = z.object({
  rate: z.number(),
  net: z.number(),
  tax: z.number(),
  gross: z.number(),
})

export type OfferTax = z.infer<typeof OfferTaxSchema>

export const OfferDetailResourceSchema = OfferResourceSchema.safeExtend({
  additional_text: z.string().nullable(),
  items: z.array(OfferItemSchema),
  taxes: z.array(OfferTaxSchema),
})

export type OfferDetailResource = z.infer<typeof OfferDetailResourceSchema>
export const { safeParseOfferDetailResource, validateOfferDetailResource } = useSchema(OfferDetailResourceSchema, 'OfferDetailResource')
