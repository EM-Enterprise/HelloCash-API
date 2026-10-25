import GET from '@/fetch/GET'
import { ArticleStockChangeCollection, ArticleStockChangeCollectionSchema, validateArticleStockChangeCollection } from '@/schemas/article/stock-changes/ArticleStockChangeCollection'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

export type GetArticleStockChangesParams = z.input<typeof PaginationParamsSchema>

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
  const query = PaginationParamsSchema.parse(params)

  const response = await GET<z.input<typeof ArticleStockChangeCollectionSchema>>(`articles/${articleId}/stock-changes`, query)

  return validateArticleStockChangeCollection(response)
}
