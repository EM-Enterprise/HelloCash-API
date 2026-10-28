import GET from '@/fetch/GET'
import { CustomerDetailResourceSchema, CustomerDetailResource } from '@/schemas/customer/CustomerDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import z from 'zod'

const GetCustomerIdSchema = z.number().int()

const GetCustomerResponseSchema = createResourceResponseSchema(CustomerDetailResourceSchema)

/**
 * Retrieves a specific customer by their unique ID.
 *
 * Returns the customer's personal or company information,
 * contact details, addresses, identification numbers,
 * newsletter preferences, custom fields, and timestamps.
 *
 * Date values are automatically transformed into JavaScript
 * Date objects during response validation.
 *
 * @param id - The unique ID of the customer to retrieve.
 * @returns The validated customer, including all available details.
 * @throws {z.ZodError} If the customer ID or API response is invalid.
 *
 * @see https://myhellocash.com/api/v2/customers/{id}
 */
export async function getCustomer(id: z.infer<typeof GetCustomerIdSchema>): Promise<CustomerDetailResource> {
  const customerId = GetCustomerIdSchema.parse(id)

  const response = await GET<z.input<typeof GetCustomerResponseSchema>>(`customers/${customerId}`)

  const { data } = GetCustomerResponseSchema.parse(response)

  return data
}
