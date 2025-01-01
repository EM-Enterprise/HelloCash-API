import { z } from 'zod'
import { CustomerSchema } from '@/schemas/customer/Customer'
import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { stripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { InvoiceItemSchema } from '@/schemas/invoice/InvoiceItem'

/**
 * @internal
 */
export const InvoiceSchema_DefaultValues = z.object({
  system_id: z.unknown().default(getRandomNumberAsString()),
  id: z.number().default(getRandomNumber()),
  timestamp: z.string().default(new Date(Date.parse('2024/12/27')).toISOString()),
  paymentType: z.string().default('PayPal'),
  total: z.number().default(getRandomNumber()),
  isCanceled: z.boolean().default(false),
  customer: CustomerSchema.optional(),
  items: z.array(InvoiceItemSchema),
})
export const InvoiceSchema = stripZodDefault(InvoiceSchema_DefaultValues)

export type Invoice = z.infer<typeof InvoiceSchema>
