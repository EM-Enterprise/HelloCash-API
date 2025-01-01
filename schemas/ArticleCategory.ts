import { z } from 'zod'
import { RawArticleCategorySchema } from '@/schemas/article-category/RawArticleCategory'

export const ArticleCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const RawArticleCategoriesSchema = z.object({
  categories: z.array(RawArticleCategorySchema),
  count: z.number(),
})

export type ArticleCategory = z.infer<typeof ArticleCategorySchema>
export type RawArticleCategories = z.infer<typeof RawArticleCategoriesSchema>
