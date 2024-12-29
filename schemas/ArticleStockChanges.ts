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

export const RawArticleStockChangeSchema = z.object({
  stock_id: z.string(),
  stock_article_id: z.string(),
  stock_timestamp: z.string(),
  stock_change: z.string(),
  stock_invoice_number: z.string(),
  stock_delivery_note_number: z.string(),
  stock_description: z.string(),
})

export type ArticleStockChange = z.infer<typeof ArticleStockChangeSchema>
export type RawArticleStockChange = z.infer<typeof RawArticleStockChangeSchema>
