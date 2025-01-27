import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'
import { getRandomNumber, getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'

/**
 * This schema defines the structure of an article object including default values.
 * @internal
 */
export const ArticleSchema = z.object({
  id: z.number().default(getRandomNumber()).optional(),
  name: z.string().default('Article-XY'),
  code: z.string().default(getRandomNumberAsString()).optional(),
  taxClass: z.number().default(getRandomNumber()).optional(),
  price: z.number().default(getRandomNumber()).optional(),
  netPrices: z.object({
    purchasePrice: z.number().default(getRandomNumber()).optional(),
    sellingPrice: z.number().default(getRandomNumber()).optional(),
  }),
  stock: z.number().default(getRandomNumber).optional(),
  negativeStockEnabled: z.boolean().optional().catch(false),
  comments: z.array(z.string()).optional().catch([]),
  category_id: z.number().optional(),
})

export type Article = z.infer<typeof ArticleSchema>

const { validateObject: validateArticle, getDummyObject: getDummyArticle, safeParseObject: safeParseArticle } = useSchema<Article>(ArticleSchema)
export { validateArticle, getDummyArticle, safeParseArticle }
