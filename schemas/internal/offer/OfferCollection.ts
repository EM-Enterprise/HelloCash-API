import { OfferDetailResourceSchema } from '@/schemas/internal/offer/OfferDetailResource'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const PaginationSchema = z.object({
  total: z.number().int(),
  limit: z.number().int(),
  offset: z.number().int(),
  has_more: z.boolean(),
})

export const OfferCollectionSchema = z.object({
  data: z.array(OfferDetailResourceSchema),
  pagination: PaginationSchema,
})

export type OfferCollection = z.infer<typeof OfferCollectionSchema>

export const { safeParseOfferCollection, validateOfferCollection } = useSchema(OfferCollectionSchema, 'OfferCollection')
