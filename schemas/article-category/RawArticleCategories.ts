import { z } from 'zod'
import { RawArticleCategorySchema } from '@/schemas/article-category/RawArticleCategory'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-article-categories object including default values.
 * @internal
 */
export const RawArticleCategoriesSchema = z.object({
  categories: z.array(RawArticleCategorySchema),
  count: z.number(),
})

export type RawArticleCategories = z.infer<StripZodDefault<typeof RawArticleCategoriesSchema>>

const {
  validateObject: validateRawArticleCategories,
  getDummyObject: getDummyRawArticleCategories,
  safeParseObject: safeParseRawArticleCategories,
} = useSchema<RawArticleCategories>(RawArticleCategoriesSchema)
export { validateRawArticleCategories, getDummyRawArticleCategories, safeParseRawArticleCategories }
