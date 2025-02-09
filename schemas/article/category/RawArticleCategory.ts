import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-article-category object including default values.
 * @internal
 */
export const RawArticleCategorySchema = z.object({
  article_category_id: z.number(),
  article_parent_category_id: z.number(),
  article_category_name: z.string(),
})

export type RawArticleCategory = z.infer<typeof RawArticleCategorySchema>

const { validateObject: validateRawArticleCategory, getDummyObject: getDummyRawArticleCategory, safeParseObject: safeParseRawArticleCategory } = useSchema<RawArticleCategory>(RawArticleCategorySchema)
export { validateRawArticleCategory, getDummyRawArticleCategory, safeParseRawArticleCategory }
