import { z } from 'zod'
import { getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { stripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { validateSchema } from '@/schemas/utils/validateSchema'

/**
 * @internal
 */
export const CustomerSchema_DefaultValues = z.object({
  id: z.string().default(getRandomNumberAsString()),
  timestamp: z
    .string()
    .default(new Date(Date.parse('2024/12/27')).toISOString())
    .optional(),
  salutation: z.string().default('Herr').optional(),
  firstName: z.string().default('John').optional(),
  lastName: z.string().default('Doe').optional(),
  email: z.string().default('john.doe@email.com').optional(),
  phone: z.string().default(getRandomNumberAsString()).optional(),
  postCode: z.string().default(getRandomNumberAsString()).optional(),
  city: z.string().default('City').optional(),
  street: z.string().default('Musterstraße').optional(),
  houseNumber: z.string().default('3').optional(),
  country: z.string().default('Austria').optional(),

  company: z.string().default('Company').optional(),
  uid_number: z.string().default('123456789').optional(),

  birthday: z.string().default('2024-12-27').optional(),
  notes: z.array(z.string()).default(['Notes']).optional(),
})

/**
 * @internal
 */
export const RawCustomerSchema_DefaultValues = z.object({
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

export const CustomerSchema = stripZodDefault(CustomerSchema_DefaultValues)
export const RawCustomerSchema = stripZodDefault(RawCustomerSchema_DefaultValues)

export const RawCustomersSchema = z.object({
  users: z.array(RawCustomerSchema),
})

export function validateCustomer(object: any) {
  return validateSchema(CustomerSchema_DefaultValues, object)
}

export type Customer = z.infer<typeof CustomerSchema>
export type RawCustomer = z.infer<typeof RawCustomerSchema>
export type RawCustomers = z.infer<typeof RawCustomersSchema>
