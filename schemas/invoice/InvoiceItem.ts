import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of an invoice item including default values
 * @internal
 */
export const InvoiceItemSchema = z.object({
  id: z.number().default(getRandomNumber()),
  name: z.string().default('Item-' + getRandomNumberAsString()),
  quantity: z.number().default(0),
  price: z.number().default(0),
  taxRate: z.number().default(0),
  discount: z.number().default(0),
})

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>

export const { getDummyInvoiceItem, safeParseInvoiceItem, validateInvoiceItem } = useSchema(InvoiceItemSchema, 'InvoiceItem')
