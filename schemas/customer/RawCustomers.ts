import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'
import { RawCustomerSchema } from '@/schemas/customer/RawCustomer'

/**
 * This schema defines the structure of a raw-customers object including default values
 * @internal
 */
export const RawCustomersSchema = z.object({
  users: z.array(RawCustomerSchema),
})

export type RawCustomers = z.infer<typeof RawCustomersSchema>

const { validateObject: validateRawCustomers, getDummyObject: getDummyRawCustomers, safeParseObject: safeParseRawCustomers } = useSchema<RawCustomers>(RawCustomersSchema)
export { validateRawCustomers, getDummyRawCustomers, safeParseRawCustomers }
