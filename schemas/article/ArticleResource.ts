import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents an article returned by the API.
 *
 * Includes article identification, pricing, tax information,
 * inventory classification, status, and catalogue sorting.
 *
 * All monetary values are expressed in the company's currency.
 * Net prices exclude tax, while gross prices include tax.
 */
export const ArticleResourceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  short_name: z.string(),
  code: z.string(),
  ean_code: z.string(),
  unit: z.string(),
  tax_rate: z.number(),
  net_selling_price: z.number(),
  gross_selling_price: z.number(),
  purchase_price: z.number().nullable(),
  status: z.enum(['active', 'inactive']),
  sort: z.number().int(),
})

export type ArticleResource = z.infer<typeof ArticleResourceSchema>

export const { getDummyArticleResource, safeParseArticleResource, validateArticleResource } = useSchema(ArticleResourceSchema, 'ArticleResource')
