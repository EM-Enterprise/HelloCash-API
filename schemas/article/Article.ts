import { z } from 'zod'
import { useSchema } from '@/schemas/utils/useSchema'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'

/**
 * This schema defines the structure of an article object including default values.
 * @internal
 */
export const ArticleSchema = z.object({
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

export type Article = z.infer<StripZodDefault<typeof ArticleSchema>>

const { validateObject: validateArticle, getDummyObject: getDummyArticle, safeParseObject: safeParseArticle } = useSchema<Article>(ArticleSchema)
export { validateArticle, getDummyArticle, safeParseArticle }
