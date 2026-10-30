import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents a stock change associated with an article.
 *
 * Contains the stock movement's unique identifier,
 * the affected article, the date and time of the change,
 * the quantity changed, and any associated invoice
 * or delivery information.
 *
 * The datetime property is automatically transformed
 * from an ISO date-time string into a JavaScript Date object.
 */
export const ArticleStockChangeResourceSchema = z.object({
  id: z.number().int(),
  article_id: z.number().int(),
  datetime: DateTimeSchema,
  change: z.number(),
  invoice_number: z.string(),
  delivery_number: z.string(),
  description: z.string(),
})

export type ArticleStockChangeResource = z.infer<typeof ArticleStockChangeResourceSchema>

export const { getDummyArticleStockChangeResource, safeParseArticleStockChangeResource, validateArticleStockChangeResource } = useSchema(ArticleStockChangeResourceSchema, 'ArticleStockChangeResource')
