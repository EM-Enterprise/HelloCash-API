import { z } from 'zod'
import { RawArticleSchema } from '@/schemas/article/RawArticle'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-articles object including default values.
 * @internal
 */
export const RawArticlesSchema = z.object({
  articles: z.array(RawArticleSchema),
})

export type RawArticles = z.infer<typeof RawArticlesSchema>

const { validateObject: validateRawArticles, getDummyObject: getDummyRawArticles, safeParseObject: safeParseRawArticles } = useSchema<RawArticles>(RawArticlesSchema)
export { validateRawArticles, getDummyRawArticles, safeParseRawArticles }
