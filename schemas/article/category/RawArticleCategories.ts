import { z } from 'zod'
import { RawArticleCategorySchema } from '@/schemas/article/category/RawArticleCategory'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-article-categories object including default values.
 * @internal
 */
export const RawArticleCategoriesSchema = z.object({
  categories: z.array(RawArticleCategorySchema),
  count: z.number(),
})

export type RawArticleCategories = z.infer<typeof RawArticleCategoriesSchema>

export const { getDummyRawArticleCategories, safeParseRawArticleCategories, validateRawArticleCategories } = useSchema(RawArticleCategoriesSchema, 'RawArticleCategories')
