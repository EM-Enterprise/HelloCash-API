import { z } from 'zod'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'
import { RawCustomerSchema } from '@/schemas/customer/RawCustomer'

/**
 * @internal
 */
export const RawCustomersSchema = z.object({
  users: z.array(RawCustomerSchema),
})

export type RawCustomers = z.infer<StripZodDefault<typeof RawCustomersSchema>>

const { validateObject: validateRawCustomers, getDummyObject: getDummyRawCustomers, safeParseObject: safeParseRawCustomers } = useSchema<RawCustomers>(RawCustomersSchema)
export { validateRawCustomers, getDummyRawCustomers, safeParseRawCustomers }
