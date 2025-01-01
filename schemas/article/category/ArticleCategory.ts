import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'

/**
 * This schema defines the structure of an article-category object including default values.
 * @internal
 */
export const ArticleCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type ArticleCategory = z.infer<StripZodDefault<typeof ArticleCategorySchema>>

const { validateObject: validateArticleCategory, getDummyObject: getDummyArticleCategory, safeParseObject: safeParseArticleCategory } = useSchema<ArticleCategory>(ArticleCategorySchema)
export { validateArticleCategory, getDummyArticleCategory, safeParseArticleCategory }