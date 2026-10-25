import GET from '@/api/GET'
import { ArticleCollection, ArticleCollectionSchema, validateArticleCollection } from '@/schemas/article/ArticleCollection'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

/**
 * Query parameters for retrieving a paginated collection of articles.
 *
 * Supports filtering by category, manufacturer, supplier,
 * article status, and search term.
 *
 * Pagination defaults to 25 articles per page, starting at
 * offset 0. Only active articles are returned by default.
 */
export const GetArticlesParamsSchema = PaginationParamsSchema.safeExtend({
  category_id: z.number().int().min(0).optional(),
  manufacturer_id: z.number().int().min(0).optional(),
  search: z.string().max(100).optional(),
  status: z.enum(['active', 'inactive', 'all']).default('active'),
  supplier_id: z.number().int().min(0).optional(),
})

export type GetArticlesParams = z.input<typeof GetArticlesParamsSchema>

/**
 * Retrieves a paginated collection of articles.
 *
 * Supports filtering by article category, manufacturer,
 * supplier, status, and search term.
 *
 * By default, only active articles are returned, sorted
 * according to the API's default ordering, with a page
 * size of 25.
 *
 * Each article includes identification, pricing, tax,
 * status, and catalogue sorting information.
 *
 * @param params - Optional filters, search term,
 *                 and pagination parameters.
 * @returns The validated article collection, including
 *          its pagination metadata.
 * @throws {z.ZodError} If the query parameters or API
 *         response are invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/articles
 */
export default async function getArticles(params: GetArticlesParams = {}): Promise<ArticleCollection> {
  const query = GetArticlesParamsSchema.parse(params)

  const response = await GET<z.input<typeof ArticleCollectionSchema>>('articles', query)

  return validateArticleCollection(response)
}
