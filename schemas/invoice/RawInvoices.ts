import { z } from 'zod'
import { RawInvoiceSchema } from '@/schemas/invoice/RawInvoice'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-invoice including default values
 * @internal
 */
export const RawInvoicesSchema = z.object({
  invoices: z.array(RawInvoiceSchema),
})

export type RawInvoices = z.infer<typeof RawInvoicesSchema>

const { validateObject: validateRawInvoices, getDummyObject: getDummyRawInvoices, safeParseObject: safeParseRawInvoices } = useSchema<RawInvoices>(RawInvoicesSchema)
export { validateRawInvoices, getDummyRawInvoices, safeParseRawInvoices }
