import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a stock-change object including default values.
 * @internal
 */
export const StockChangeSchema = z.object({
  id: z.number(),
  article_id: z.number(),
  timestamp: z.string(),
  change: z.number(),
  invoice_id: z.number(),
  description: z.string(),
  delivery_number: z.string(),
})

export type StockChange = z.infer<typeof StockChangeSchema>

const { validateObject: validateStockChange, getDummyObject: getDummyStockChange, safeParseObject: safeParseStockChange } = useSchema<StockChange>(StockChangeSchema)
export { validateStockChange, getDummyStockChange, safeParseStockChange }
