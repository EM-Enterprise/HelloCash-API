import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const CustomerResourceSchema = z.object({
  id: z.number().int(),
  customer_number: z.number().int().nullable(),
  salutation: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  company_name: z.string().nullable(),
  email: z.string().nullable(),
  phone_number: z.string().nullable(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
  postal_code: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country_code: z.string().nullable(),
  birth_date: DateTimeSchema.nullable(),
  uid_number: z.string().nullable(),
  tax_number: z.string().nullable(),
  passport_number: z.string().nullable(),
  other_identification_number: z.string().nullable(),
  comment: z.string().nullable(),
  accept_newsletter: z.boolean(),
  accept_sms_newsletter: z.boolean(),
})

export type CustomerResource = z.infer<typeof CustomerResourceSchema>

export const { getDummyCustomerResource, safeParseCustomerResource, validateCustomerResource } = useSchema(CustomerResourceSchema, 'CustomerResource')
