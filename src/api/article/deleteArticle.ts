import DELETE from '@/api/DELETE'
import { z } from 'zod'

const DeleteArticleIdSchema = z.number().int()

/**
 * Deletes an article by its unique ID.
 *
 * Sends an authenticated DELETE request to the article
 * endpoint. The API returns HTTP 204 No Content upon success.
 *
 * @param id - The unique ID of the article to delete.
 * @returns Resolves when the article has been deleted.
 *          No response body is returned.
 * @throws {z.ZodError} If the article ID is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/articles/{id}
 */
export default async function deleteArticle(id: z.infer<typeof DeleteArticleIdSchema>): Promise<void> {
  const articleId = DeleteArticleIdSchema.parse(id)

  await DELETE(`articles/${articleId}`)
}
