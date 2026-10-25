import GET from '@/fetch/GET'
import { OfferCollection, validateOfferCollection } from '@/schemas/offer/OfferCollection'
import { z } from 'zod'

export const GetOffersParamsSchema = z.object({
  archived: z.boolean().default(false),
  customer_id: z.number().int().min(1).optional(),
  from: z.string().optional(),
  limit: z.number().int().min(1).max(250).default(25),
  offset: z.number().int().min(0).default(0),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(256).optional(),
  sort: z.enum(['created_at', 'number', 'gross_total']).default('created_at'),
  status: z.enum(['open', 'commissioned', 'all']).optional(),
  to: z.string().optional(),
})

export type GetOffersParams = z.input<typeof GetOffersParamsSchema>

/**
 * Retrieves a paginated collection of offers.
 *
 * By default, only active (non-archived) offers are returned,
 * sorted by creation date in descending order.
 *
 * Supports filtering by customer, date range, status, and search
 * term, as well as sorting and pagination.
 *
 * @param params - Optional filters, sorting, and pagination options.
 * @returns The validated collection of offers and pagination metadata.
 * @throws {z.ZodError} If the query parameters or API response are invalid.
 *
 * @see https://myhellocash.com/docs/api/operations/offer.index
 */
export default async function getOffers(params: GetOffersParams = {}): Promise<OfferCollection> {
  const query = GetOffersParamsSchema.parse(params)

  const response = await GET<OfferCollection>('offers', query)

  return validateOfferCollection(response)
}
