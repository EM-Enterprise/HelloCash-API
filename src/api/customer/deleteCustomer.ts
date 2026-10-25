import DELETE from '@/fetch/DELETE'
import { z } from 'zod'

const DeleteCustomerIdSchema = z.number().int()

/**
 * Deletes a customer by their unique ID.
 *
 * Sends an authenticated DELETE request to the customer
 * endpoint. The API returns HTTP 204 No Content upon success.
 *
 * @param id - The unique ID of the customer to delete.
 * @returns Resolves when the customer has been deleted.
 *          No response body is returned.
 * @throws {z.ZodError} If the customer ID is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/customers/{id}
 */
export default async function deleteCustomer(id: z.infer<typeof DeleteCustomerIdSchema>): Promise<void> {
  const customerId = DeleteCustomerIdSchema.parse(id)

  await DELETE(`customers/${customerId}`)
}
