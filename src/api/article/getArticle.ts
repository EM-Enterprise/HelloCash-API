import GET from '@/fetch/GET'
import { ArticleDetailResourceSchema, ArticleDetailResource } from '@/schemas/article/ArticleDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { z } from 'zod'

const GetArticleIdSchema = z.number().int()

const GetArticleResponseSchema = createResourceResponseSchema(ArticleDetailResourceSchema)

/**
 * Retrieves a specific article by its unique ID.
 *
 * Returns detailed article information, including pricing,
 * tax rates, category and supplier references, inventory
 * settings, take-away pricing, and timestamps.
 *
 * ISO date-time strings are automatically transformed into
 * JavaScript Date objects during response validation.
 *
 * @param id - The unique ID of the article to retrieve.
 * @returns The validated article, including its detailed
 *          configuration, stock information, and references.
 * @throws {z.ZodError} If the article ID or API response is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/articles/{id}
 */
export default async function getArticle(id: z.infer<typeof GetArticleIdSchema>): Promise<ArticleDetailResource> {
  const articleId = GetArticleIdSchema.parse(id)

  const response = await GET<z.input<typeof GetArticleResponseSchema>>(`articles/${articleId}`)

  const { data } = GetArticleResponseSchema.parse(response)

  return data
}
