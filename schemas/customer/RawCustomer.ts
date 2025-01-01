import { z } from 'zod'
import { getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-customer object including default values
 * @internal
 */
export const RawCustomerSchema = z.object({
  user_id: z.string().default(getRandomNumberAsString()),
  user_timestamp: z
    .string()
    .nullable()
    .default(new Date(Date.parse('2024/12/27')).toISOString()),
  user_salutation: z.string().nullable().default('Herr'),
  user_firstname: z.string().nullable().default('John'),
  user_surname: z.string().nullable().default('Doe'),
  user_email: z.string().nullable().default('john.doe@email.com'),
  user_phoneNumber: z.string().nullable().default(getRandomNumberAsString()),

  user_postalCode: z.string().nullable().default(getRandomNumberAsString()),
  user_city: z.string().nullable().default('City'),
  user_street: z.string().nullable().default('Musterstraße'),
  user_houseNumber: z.string().nullable().default('3'),
  user_country: z.string().nullable().default('Austria'),

  user_uidNumber: z.string().nullable().default('123456789'),
  user_company: z.string().nullable().default('Company'),
  user_birthday: z.string().nullable().default('2024-12-27'),
  user_notes: z.string().nullable().default('Notes'),

  user_custom_fields: z.any(),
})

export type RawCustomer = z.infer<StripZodDefault<typeof RawCustomerSchema>>

const { validateObject: validateRawCustomer, getDummyObject: getDummyRawCustomer, safeParseObject: safeParseRawCustomer } = useSchema<RawCustomer>(RawCustomerSchema)
export { validateRawCustomer, getDummyRawCustomer, safeParseRawCustomer }
