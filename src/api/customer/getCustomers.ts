import GET from '@/fetch/GET'
import { CustomerCollection, CustomerCollectionSchema, validateCustomerCollection } from '@/schemas/customer/CustomerCollection'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

const GetCustomersParamsSchema = PaginationParamsSchema.safeExtend({
  country_code: z.enum(['at', 'de', 'cz', 'ch', 'sk', 'hu', 'bg', 'pl', 'ro', 'fr', 'es', 'AT', 'DE', 'CZ', 'CH', 'SK', 'HU', 'BG', 'PL', 'RO', 'FR', 'ES']).optional(),
  only_trashed: z.boolean().default(false),
  search: z.string().max(255).optional(),
  with_trashed: z.boolean().default(false),
})

export type GetCustomersParams = z.input<typeof GetCustomersParamsSchema>

/**
 * Retrieves a paginated collection of customers.
 *
 * Supports filtering by country, searching customers,
 * and including or exclusively retrieving trashed customers.
 *
 * By default, only non-trashed customers are returned,
 * with a page size of 25.
 *
 * @param params - Optional filtering, search, and pagination
 *                 parameters.
 * @returns The validated customer collection, including
 *          customer resources and pagination metadata.
 * @throws {z.ZodError} If the query parameters or API
 *         response are invalid.
 *
 * @see https://myhellocash.com/api/v2/customers
 */
export default async function getCustomers(params: GetCustomersParams = {}): Promise<CustomerCollection> {
  const query = GetCustomersParamsSchema.parse(params)

  const response = await GET<z.input<typeof CustomerCollectionSchema>>('customers', query)

  return validateCustomerCollection(response)
}
