import GET from '@/fetch/GET'
import { ArticleCategoryCollection, ArticleCategoryCollectionSchema, validateArticleCategoryCollection } from '@/schemas/article-category/ArticleCategoryCollection'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

export const GetArticleCategoriesParamsSchema = PaginationParamsSchema.safeExtend({
  search: z.string().max(100).optional(),
  status: z.enum(['active', 'inactive', 'all']).default('active'),
})

export type GetArticleCategoriesParams = z.input<typeof GetArticleCategoriesParamsSchema>

/**
 * Retrieves a paginated collection of article categories.
 *
 * Supports searching by category and filtering by status,
 * as well as pagination.
 *
 * By default, only active categories are returned,
 * with a page size of 25.
 *
 * @param params - Optional search, status, and pagination filters.
 * @returns The validated collection of article categories,
 *          including pagination metadata.
 * @throws {z.ZodError} If the query parameters or API response
 *         are invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/article-categories
 */
export async function getArticleCategories(params: GetArticleCategoriesParams = {}): Promise<ArticleCategoryCollection> {
  const query = GetArticleCategoriesParamsSchema.parse(params)

  const response = await GET<z.input<typeof ArticleCategoryCollectionSchema>>('article-categories', query)

  return validateArticleCategoryCollection(response)
}
