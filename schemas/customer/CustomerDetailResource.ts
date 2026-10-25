import { CustomerResourceSchema } from '@/schemas/customer/CustomerResource'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Detailed customer resource returned by the API.
 *
 * Extends the standard customer resource with creation and
 * deletion timestamps, as well as custom field values.
 *
 * Date-time strings are automatically transformed into
 * JavaScript Date objects during parsing.
 */
export const CustomerDetailResourceSchema = CustomerResourceSchema.safeExtend({
  created_at: DateTimeSchema.nullable(),
  deleted_at: DateTimeSchema.nullable(),
  custom_fields: z.record(z.string(), z.string()),
})

export type CustomerDetailResource = z.infer<typeof CustomerDetailResourceSchema>

export const { getDummyCustomerDetailResource, safeParseCustomerDetailResource, validateCustomerDetailResource } = useSchema(CustomerDetailResourceSchema, 'CustomerDetailResource')
