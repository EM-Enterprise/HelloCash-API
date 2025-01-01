import { z } from 'zod'

export const ArticleStockChangeSchema = z.object({
  id: z.number(),
  article_id: z.number(),
  timestamp: z.string(),
  change: z.number(),
  invoice_id: z.number(),
  description: z.string(),
  delivery_number: z.string(),
})

export type ArticleStockChange = z.infer<typeof ArticleStockChangeSchema>
