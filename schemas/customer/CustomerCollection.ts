import { CustomerResourceSchema } from '@/schemas/customer/CustomerResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Schema for a paginated collection of customers.
 *
 * Validates each customer using CustomerResourceSchema
 * and includes the shared pagination metadata.
 *
 * Customer birth dates are automatically transformed
 * from ISO date strings into JavaScript Date objects.
 */
export const CustomerCollectionSchema = createCollectionSchema(CustomerResourceSchema)

export type CustomerCollection = z.infer<typeof CustomerCollectionSchema>

export const { getDummyCustomerCollection, safeParseCustomerCollection, validateCustomerCollection } = useSchema(CustomerCollectionSchema, 'CustomerCollection')
