import { z } from 'zod'
import { getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { stripZodDefault } from '@/schemas/utils/stripZodDefaultValues'

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

export const CustomerSchema = stripZodDefault(CustomerSchema_DefaultValues)

export type Customer = z.infer<typeof CustomerSchema>
