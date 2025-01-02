import { z } from 'zod'
import { CustomerSchema } from '@/schemas/customer/Customer'
import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { InvoiceItemSchema } from '@/schemas/invoice/InvoiceItem'
import { useSchema } from '@/schemas/utils/useSchema'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'

/**
 * This schema defines the structure of an invoice including default values
 * @internal
 */
export const InvoiceSchema = z.object({
  system_id: z.unknown().default(getRandomNumberAsString()),
  id: z.number().default(getRandomNumber()),
  timestamp: z.string().default(new Date(Date.parse('2024/12/27')).toISOString()),
  paymentType: z.string().default('PayPal'),
  total: z.number().default(getRandomNumber()),
  isCanceled: z.boolean().default(false),
  customer: CustomerSchema.optional(),
  items: z.array(InvoiceItemSchema),
})

export type Invoice = z.infer<StripZodDefault<typeof InvoiceSchema>>

const { validateObject: validateInvoice, getDummyObject: getDummyInvoice, safeParseObject: safeParseInvoice } = useSchema<Invoice>(InvoiceSchema)
export { validateInvoice, getDummyInvoice, safeParseInvoice }
