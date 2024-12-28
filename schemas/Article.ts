import { z } from 'zod'

const ArticleSchema = z.object({
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

const RawArticleSchema = z.object({
  article_id: z.string().optional(),
  article_category_id: z.number().optional(),
  article_name: z.string().default('Article-XY'),
  article_code: z.string().optional(),
  article_eanCode: z.string().optional(),
  article_taxRate: z.string().optional(),
  article_unit: z.string().optional(),
  article_net_purchacePrice: z.string().optional(),
  article_net_sellingPrice: z.string().optional(),
  article_gross_sellingPrice: z.string().optional(),
  article_stock: z.string().optional(),
  article_minStock: z.string(),
  article_comment: z.string().optional(),
  article_billReference: z.string(),
  article_negativeStock: z.boolean().optional().catch(false),
  article_stockStatus: z.number().optional().catch(0),
})

const RawArticlesSchema = z.object({
  articles: z.array(RawArticleSchema),
})

export type Article = z.infer<typeof ArticleSchema>
export type RawArticle = z.infer<typeof RawArticleSchema>
export type RawArticles = z.infer<typeof RawArticlesSchema>
