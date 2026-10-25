import POST from '@/fetch/POST'
import { ArticleStockChangeResourceSchema, ArticleStockChangeResource } from '@/schemas/article/stock-changes/ArticleStockChangeResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { z } from 'zod'

/**
 * Validates the request body for changing an article's stock.
 *
 * stock_change represents a relative adjustment:
 * positive values increase stock, negative values decrease it.
 *
 * The adjustment must be nonzero, have at most three decimal
 * places, and remain within the documented numeric bounds.
 *
 * The server additionally validates the resulting stock level
 * against the article's negative_stock configuration.
 */
export const UpdateArticleStockSchema = z.object({
  stock_change: z
    .number()
    .min(-99999999.999)
    .max(99999999.999)
    .refine((value) => Math.round(value * 1000) !== 0, 'Stock change must not round to zero at three decimal places.')
    .refine((value) => Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-6, 'Stock change must have at most three decimal places.'),

  invoice_number: z.string().max(30).nullable().optional(),
  delivery_number: z.string().max(30).nullable().optional(),
  description: z.string().max(255).nullable().optional(),
})

export type UpdateArticleStockParams = z.input<typeof UpdateArticleStockSchema>

const UpdateArticleStockIdSchema = z.number().int()

const UpdateArticleStockResponseSchema = createResourceResponseSchema(ArticleStockChangeResourceSchema)

/**
 * Changes the stock quantity of a specific article.
 *
 * Applies a relative stock adjustment rather than setting
 * the stock to an absolute quantity.
 *
 * Positive values increase stock, while negative values
 * decrease it. The API records the adjustment in the
 * article's stock-change history.
 *
 * A stock change must be nonzero, support at most three
 * decimal places, and remain within the allowed range.
 *
 * The API rejects stock reductions that would result in
 * negative stock when negative_stock is disabled.
 *
 * @param id - The unique ID of the article.
 * @param params - The stock adjustment and optional invoice,
 *                 delivery, and description information.
 * @returns The recorded stock change, including its ID,
 *          quantity adjustment, and timestamp.
 * @throws {z.ZodError} If the article ID, request body,
 *         or API response is invalid.
 * @throws If the API request fails or the stock adjustment
 *         violates server-side stock restrictions.
 *
 * @see https://myhellocash.com/api/v2/articles/{id}/change-stock
 */
export async function updateArticleStock(id: z.infer<typeof UpdateArticleStockIdSchema>, params: UpdateArticleStockParams): Promise<ArticleStockChangeResource> {
  const articleId = UpdateArticleStockIdSchema.parse(id)
  const body = UpdateArticleStockSchema.parse(params)

  const response = await POST<z.input<typeof UpdateArticleStockResponseSchema>>(`articles/${articleId}/change-stock`, body)

  const { data } = UpdateArticleStockResponseSchema.parse(response)

  return data
}
