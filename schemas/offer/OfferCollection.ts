import { OfferResourceSchema } from '@/schemas/offer/OfferResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const OfferCollectionSchema = createCollectionSchema(OfferResourceSchema)

export type OfferCollection = z.infer<typeof OfferCollectionSchema>

export const { safeParseOfferCollection, validateOfferCollection } = useSchema(OfferCollectionSchema, 'OfferCollection')
