import GET from '@/api/GET'
import { ArticleStockChangeCollection, ArticleStockChangeCollectionSchema, validateArticleStockChangeCollection } from '@/schemas/article/stock-changes/ArticleStockChangeCollection'
import { PaginationSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

export const GetArticleStockChangeParamsSchema = PaginationSchema.pick({ limit: true, offset: true })
export type GetArticleStockChangesParams = z.input<typeof GetArticleStockChangeParamsSchema>

const GetArticleStockChangesIdSchema = z.number().int()

/**
 * Retrieves the stock change history of a specific article.
 *
 * Returns a paginated collection of stock movements,
 * including quantity adjustments, related invoice and
 * delivery numbers, descriptions, and timestamps.
 *
 * Positive stock changes represent increases, while
 * negative changes represent decreases.
 *
 * Date-time strings are automatically transformed into
 * JavaScript Date objects during response validation.
 *
 * @param id - The unique ID of the article.
 * @param params - Optional pagination parameters.
 * @returns The validated collection of stock changes,
 *          including pagination metadata.
 * @throws {z.ZodError} If the article ID, query parameters,
 *         or API response are invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/docs/api
 */
export default async function getArticleStockChanges(id: z.infer<typeof GetArticleStockChangesIdSchema>, params: GetArticleStockChangesParams = {}): Promise<ArticleStockChangeCollection> {
  const articleId = GetArticleStockChangesIdSchema.parse(id)
  const query = GetArticleStockChangeParamsSchema.parse(params)

  const response = await GET<z.input<typeof ArticleStockChangeCollectionSchema>>(`articles/${articleId}/stock-changes`, query)

  return validateArticleStockChangeCollection(response)
}
