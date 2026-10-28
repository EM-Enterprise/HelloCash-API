import { z } from 'zod'
import POST from '@/fetch/POST'
import { CreateOfferParams, validateCreateOffer } from '@/schemas/offer/OfferCreate'
import { OfferDetailResource, OfferDetailResourceSchema } from '@/schemas/offer/OfferDetailResource'

const CreateOfferResponseSchema = z.object({
  data: OfferDetailResourceSchema,
})

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
export async function createOffer(offer: CreateOfferParams): Promise<OfferDetailResource> {
  const body = validateCreateOffer(offer)

  const response = await POST<CreateOfferParams>('offers', body)

  const { data } = CreateOfferResponseSchema.parse(response)

  return data
}
