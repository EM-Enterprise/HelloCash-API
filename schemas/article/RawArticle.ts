import { z } from 'zod'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'
import { getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'

/**
 * This schema defines the structure of a raw-article object including default values.
 * @internal
 */
export const RawArticleSchema = z.object({
  article_id: z.string().default(getRandomNumberAsString()).optional(),
  article_category_id: z.number().optional(),
  article_name: z.string().default('Article-XY'),
  article_code: z.string().default(getRandomNumberAsString()).optional(),
  article_eanCode: z.string().default(getRandomNumberAsString()).optional(),
  article_taxRate: z.string().default(getRandomNumberAsString()).optional(),
  article_unit: z.string().optional(),
  article_net_purchacePrice: z.string().default(getRandomNumberAsString()).optional(),
  article_net_sellingPrice: z.string().default(getRandomNumberAsString()).optional(),
  article_gross_sellingPrice: z.string().default(getRandomNumberAsString()).optional(),
  article_stock: z.string().default(getRandomNumberAsString()).optional(),
  article_minStock: z.string().default(getRandomNumberAsString()),
  article_comment: z.string().default('').optional(),
  article_billReference: z.string(),
  article_negativeStock: z.boolean().optional().catch(false),
  article_stockStatus: z.number().optional().catch(0),
})

export type RawArticle = z.infer<StripZodDefault<typeof RawArticleSchema>>

const { validateObject: validateRawArticle, getDummyObject: getDummyRawArticle, safeParseObject: safeParseRawArticle } = useSchema<RawArticle>(RawArticleSchema)
export { validateRawArticle, getDummyRawArticle, safeParseRawArticle }
