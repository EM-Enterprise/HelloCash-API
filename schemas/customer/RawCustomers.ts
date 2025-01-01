import { z } from 'zod'
import { RawCustomerSchema_DefaultValues } from '@/schemas/customer/Customer'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * @internal
 */
export const RawCustomersSchema = z.object({
  users: z.array(RawCustomerSchema_DefaultValues),
})

export type RawCustomers = z.infer<StripZodDefault<typeof RawCustomersSchema>>

const { validateObject: validateRawCustomers, getDummyObject: getDummyRawCustomers, safeParseObject: safeParseRawCustomers } = useSchema<RawCustomers>(RawCustomersSchema)
export { validateRawCustomers, getDummyRawCustomers, safeParseRawCustomers }
