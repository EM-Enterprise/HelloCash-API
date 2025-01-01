import { z } from 'zod'
import { RawArticleSchema } from '@/schemas/article/RawArticle'

export const ArticleSchema = z.object({
  id: z.number().optional(),
  name: z.string().default('Article-XY'),
  code: z.string().optional(),
  taxClass: z.number().optional(),
  price: z.number().optional(),
  netPrices: z.object({
    purchasePrice: z.number().optional(),
    sellingPrice: z.number().optional(),
  }),
  stock: z.number().optional(),
  negativeStockEnabled: z.boolean().optional().catch(false),
  comments: z.array(z.string()).optional(),
  category_id: z.number().optional(),
})

export const RawArticlesSchema = z.object({
  articles: z.array(RawArticleSchema),
})

export type Article = z.infer<typeof ArticleSchema>
export type RawArticles = z.infer<typeof RawArticlesSchema>
