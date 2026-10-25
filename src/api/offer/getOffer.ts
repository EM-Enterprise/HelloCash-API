import GET from '@/fetch/GET'
import { OfferDetailResource, OfferDetailResourceSchema } from '@/schemas/offer/OfferDetailResource'
import { z } from 'zod'

const GetOfferIdSchema = z.number().int().min(1)

const GetOfferResponseSchema = z.object({
  data: OfferDetailResourceSchema,
})

/**
 * Retrieves a specific offer by its unique ID.
 *
 * Includes the offer's positions, calculated totals, tax breakdown,
 * and additional metadata.
 *
 * Archived offers remain accessible through this endpoint.
 * Their archived status is indicated by the `archived` property.
 *
 * @param id - The unique ID of the offer to retrieve.
 * @returns The validated offer, including its positions and tax breakdown.
 * @throws {z.ZodError} If the offer ID or API response is invalid.
 *
 * @see https://myhellocash.com/api/v2/offers/{id}
 */
export default async function getOffer(id: z.infer<typeof GetOfferIdSchema>): Promise<OfferDetailResource> {
  const offerId = GetOfferIdSchema.parse(id)

  const response = await GET<z.input<typeof GetOfferResponseSchema>>(`offers/${offerId}`)

  const { data } = GetOfferResponseSchema.parse(response)

  return data
}
