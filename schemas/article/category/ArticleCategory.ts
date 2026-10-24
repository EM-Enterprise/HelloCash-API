import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of an article-category object including default values.
 * @internal
 */
export const ArticleCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type ArticleCategory = z.infer<typeof ArticleCategorySchema>

export const { getDummyArticleCategory, safeParseArticleCategory, validateArticleCategory } = useSchema(ArticleCategorySchema, 'ArticleCategory')
