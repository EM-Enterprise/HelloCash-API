import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

const CreateOfferItemSchema = z.object({
  name: z.string().min(1).max(150),
  quantity: z.number(),
  price: z.number().min(0).max(99999999.99),
  tax_rate: z.number().min(0).max(100),
  discount_unit: z.enum(['percent', 'absolute']).nullable().optional(),
  discount_value: z.number().min(0).default(0),
  service_id: z.number().int().min(1).nullable().optional(),
  article_id: z.number().int().min(1).nullable().optional(),
  type: z.enum(['article', 'service']).nullable().optional(),
})

export type CreateOfferItem = z.infer<typeof CreateOfferItemSchema>

export const CreateOfferSchema = z.object({
  items: z.array(CreateOfferItemSchema).min(1).max(500),
  discount_percent: z.number().int().min(0).max(100).default(0),
  remark: z.string().max(150).nullable().optional(),
  additional_text: z.string().max(5000).nullable().optional(),
  customer_id: z.number().int().min(1).optional(),
  employee_id: z.number().int().min(1).optional(),
})

export type CreateOffer = z.infer<typeof CreateOfferSchema>

export const { validateCreateOffer, safeParseCreateOffer } = useSchema(CreateOfferSchema, 'CreateOffer')
