import { z } from 'zod'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-article-stock-change object including default values.
 * @internal
 */
export const RawStockChangeSchema = z.object({
  stock_id: z.string(),
  stock_article_id: z.string(),
  stock_timestamp: z.string(),
  stock_change: z.string(),
  stock_invoice_number: z.string(),
  stock_delivery_note_number: z.string(),
  stock_description: z.string(),
})

export type RawStockChange = z.infer<StripZodDefault<typeof RawStockChangeSchema>>

const { validateObject: validateRawStockChange, getDummyObject: getDummyRawStockChange, safeParseObject: safeParseRawStockChange } = useSchema<RawStockChange>(RawStockChangeSchema)
export { validateRawStockChange, getDummyRawStockChange, safeParseRawStockChange }
