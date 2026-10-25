import { OfferDetailResourceSchema } from '@/schemas/offer/OfferDetailResource'
import { OfferResourceSchema } from '@/schemas/offer/OfferResource'
import { PaginationSchema } from '@/schemas/Shared/PaginationSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const OfferCollectionSchema = z.object({
  data: z.array(OfferResourceSchema),
  pagination: PaginationSchema,
})

export type OfferCollection = z.infer<typeof OfferCollectionSchema>

export const { safeParseOfferCollection, validateOfferCollection } = useSchema(OfferCollectionSchema, 'OfferCollection')
