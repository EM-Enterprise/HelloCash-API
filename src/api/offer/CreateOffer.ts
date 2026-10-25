import { z } from 'zod'
import POST from '@/api/POST'
import { CreateOffer, validateCreateOffer } from '@/schemas/offer/OfferCreate'
import { OfferDetailResource, OfferDetailResourceSchema } from '@/schemas/offer/OfferDetailResource'

export const CreateOfferResponseSchema = z.object({
  data: OfferDetailResourceSchema,
})

export type CreateOfferResponse = z.infer<typeof CreateOfferResponseSchema>

/**
 * Creates a new offer with the provided positions and optional details.
 *
 * The offer number is assigned automatically by the API.
 * Totals, discounts, and tax amounts are calculated server-side.
 *
 * @param offer - The positions and optional offer properties.
 * @returns The newly created offer, including its positions,
 *          calculated totals, tax breakdown, and metadata.
 * @throws {z.ZodError} If the request or response is invalid.
 *
 * @see https://myhellocash.com/api/v2/offers
 */
export default async function createOffer(offer: CreateOffer): Promise<OfferDetailResource> {
  const body = validateCreateOffer(offer)

  const response = await POST<CreateOffer>('offers', body)

  const { data } = CreateOfferResponseSchema.parse(response)

  return data
}
