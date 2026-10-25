import PUT from '@/api/PUT'
import { CustomerDetailResourceSchema, CustomerDetailResource } from '@/schemas/customer/CustomerDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { CreateCustomerSchema } from '@/src/api/customer/createCustomer'
import { z } from 'zod'

/**
 * Validates the properties that can be updated on a customer.
 *
 * All fields are optional. Only explicitly provided values
 * are included in the validated request body.
 *
 * Reuses the validation constraints of CreateCustomerSchema
 * without applying creation-specific default values. That means,
 * `CreateCustomerSchema` defines the extended properties as such:
 * ````
accept_newsletter: z.boolean().default(false),
accept_sms_newsletter: z.boolean().default(false),
* ````
In case we reuse those defaults incorrectly, an update that only changes the customer's name could unintentionally reset their newsletter preferences.

By replacing them with z.boolean() before calling .partial(), we ensure that they remain genuinely optional.
 */
export const UpdateCustomerSchema = CreateCustomerSchema.safeExtend({
  accept_newsletter: z.boolean(),
  accept_sms_newsletter: z.boolean(),
}).partial()

export type UpdateCustomerParams = z.input<typeof UpdateCustomerSchema>

const UpdateCustomerIdSchema = z.number().int()

const UpdateCustomerResponseSchema = createResourceResponseSchema(CustomerDetailResourceSchema)

/**
 * Updates an existing customer by their unique ID.
 *
 * Supports updating personal and company information,
 * contact details, addresses, identification numbers,
 * newsletter preferences, and other customer properties.
 *
 * All request properties are optional. Only explicitly
 * provided properties are sent to the API.
 *
 * Birth dates may be provided as JavaScript Date objects
 * or ISO date strings and are automatically serialized
 * into YYYY-MM-DD strings before sending the request.
 *
 * @param id - The unique ID of the customer to update.
 * @param customer - The customer properties to update.
 * @returns The updated customer, including custom fields
 *          and automatically transformed date properties.
 * @throws {z.ZodError} If the customer ID, request body,
 *         or API response is invalid.
 *
 * @see https://myhellocash.com/api/v2/customers/{id}
 */
export default async function updateCustomer(id: z.infer<typeof UpdateCustomerIdSchema>, customer: UpdateCustomerParams): Promise<CustomerDetailResource> {
  const customerId = UpdateCustomerIdSchema.parse(id)
  const body = UpdateCustomerSchema.parse(customer)

  const response = await PUT<z.input<typeof UpdateCustomerResponseSchema>>(`customers/${customerId}`, body)

  const { data } = UpdateCustomerResponseSchema.parse(response)

  return data
}
