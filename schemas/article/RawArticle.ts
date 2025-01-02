import { z } from 'zod'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-article object including default values.
 * @internal
 */
export const RawArticleSchema = z.object({
  article_id: z.string().optional(),
  article_category_id: z.number().optional(),
  article_name: z.string().default('Article-XY'),
  article_code: z.string().optional(),
  article_eanCode: z.string().optional(),
  article_taxRate: z.string().optional(),
  article_unit: z.string().optional(),
  article_net_purchacePrice: z.string().optional(),
  article_net_sellingPrice: z.string().optional(),
  article_gross_sellingPrice: z.string().optional(),
  article_stock: z.string().optional(),
  article_minStock: z.string(),
  article_comment: z.string().optional(),
  article_billReference: z.string(),
  article_negativeStock: z.boolean().optional().catch(false),
  article_stockStatus: z.number().optional().catch(0),
})

export type RawArticle = z.infer<StripZodDefault<typeof RawArticleSchema>>

const { validateObject: validateRawArticle, getDummyObject: getDummyRawArticle, safeParseObject: safeParseRawArticle } = useSchema<RawArticle>(RawArticleSchema)
export { validateRawArticle, getDummyRawArticle, safeParseRawArticle }
