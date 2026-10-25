import POST from '@/api/POST'
import { CustomerDetailResourceSchema, CustomerDetailResource } from '@/schemas/customer/CustomerDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { z } from 'zod'

export const CreateCustomerSchema = z.object({
  country_code: z.enum(['at', 'de', 'cz', 'ch', 'sk', 'hu', 'bg', 'pl', 'ro', 'fr', 'es']),

  last_name: z.string().min(1).max(100).nullable().optional(),
  company_name: z.string().min(1).max(100).nullable().optional(),
  salutation: z.string().max(20).nullable().optional(),
  first_name: z.string().max(100).nullable().optional(),
  email: z.string().max(100).nullable().optional(),
  phone_number: z.string().max(50).nullable().optional(),
  street: z.string().max(100).nullable().optional(),
  house_number: z.string().max(20).nullable().optional(),
  postal_code: z.string().max(20).nullable().optional(),
  city: z.string().max(100).nullable().optional(),
  state: z.string().max(50).nullable().optional(),

  birth_date: DateTimeSchema.nullable().optional(),

  uid_number: z.string().max(50).nullable().optional(),
  tax_number: z.string().max(50).nullable().optional(),
  passport_number: z.string().max(50).nullable().optional(),
  other_identification_number: z.string().max(50).nullable().optional(),

  comment: z.string().max(2000).nullable().optional(),

  accept_newsletter: z.boolean().default(false),
  accept_sms_newsletter: z.boolean().default(false),
})

/**
 * The properties callers can provide when creating a customer.
 *
 * Date fields accept Date objects or ISO date strings.
 * Properties with default values may be omitted.
 */
export type CreateCustomerParams = z.input<typeof CreateCustomerSchema>

const CreateCustomerResponseSchema = createResourceResponseSchema(CustomerDetailResourceSchema)

/**
 * Creates a new customer.
 *
 * Supports personal and company customer information,
 * contact details, addresses, identification numbers,
 * and newsletter preferences.
 *
 * Birth dates may be supplied as JavaScript Date objects
 * or ISO date strings and are automatically serialized
 * into YYYY-MM-DD strings before sending the request.
 *
 * Newsletter preferences default to false when omitted.
 *
 * @param customer - The customer information to create.
 * @returns The newly created customer, including its unique
 *          ID, customer number, timestamps, and custom fields.
 * @throws {z.ZodError} If the request body or API response
 *         does not match its corresponding schema.
 *
 * @see https://myhellocash.com/api/v2/customers
 */
export default async function createCustomer(customer: CreateCustomerParams): Promise<CustomerDetailResource> {
  const body = CreateCustomerSchema.parse(customer)

  const response = await POST<z.input<typeof CreateCustomerResponseSchema>>('customers', body)

  const { data } = CreateCustomerResponseSchema.parse(response)

  return data
}
