import { z } from 'zod'
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

export type RawStockChange = z.infer<typeof RawStockChangeSchema>

export const { getDummyRawStock, safeParseRawStock, validateRawStock } = useSchema(RawStockChangeSchema, 'RawStock')
