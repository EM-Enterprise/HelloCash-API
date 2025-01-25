import { z } from 'zod'
import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a customer object including default values
 * @internal
 */
export const CustomerSchema = z.object({
  id: z.number().default(getRandomNumber()),
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

export type Customer = z.infer<StripZodDefault<typeof CustomerSchema>>

const { validateObject: validateCustomer, getDummyObject: getDummyCustomer, safeParseObject: safeParseCustomer } = useSchema<Customer>(CustomerSchema)
export { validateCustomer, getDummyCustomer, safeParseCustomer }
