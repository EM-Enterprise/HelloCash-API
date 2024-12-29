import { z } from 'zod'

const ArticleCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

const RawArticleCategorySchema = z.object({
  article_category_id: z.number(),
  article_parent_category_id: z.number(),
  article_category_name: z.string(),
})

const RawArticleCategoriesSchema = z.object({
  categories: z.array(RawArticleCategorySchema),
  count: z.number(),
})

export type ArticleCategory = z.infer<typeof ArticleCategorySchema>
export type RawArticleCategory = z.infer<typeof RawArticleCategorySchema>
export type RawArticleCategories = z.infer<typeof RawArticleCategoriesSchema>
