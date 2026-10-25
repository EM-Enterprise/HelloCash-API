import PUT from '@/fetch/PUT'
import { ArticleDetailResourceSchema, ArticleDetailResource } from '@/schemas/article/ArticleDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Validates the request body for updating an article.
 *
 * All properties are optional. Only explicitly provided
 * values are included in the validated request.
 *
 * Nullable properties accept null to clear their values.
 * No creation-specific defaults are applied.
 *
 * Selling prices and tax rates may trigger server-side
 * recalculation of the corresponding net selling price.
 * @internal
 */
export const UpdateArticleSchema = z.object({
  name: z.string().min(1).max(150).optional(),

  short_name: z.string().max(26).nullable().optional(),
  code: z.string().max(20).nullable().optional(),
  ean_code: z.string().max(40).nullable().optional(),

  category_id: z.number().int().min(0).nullable().optional(),
  supplier_id: z.number().int().min(0).nullable().optional(),
  manufacturer_id: z.number().int().min(0).nullable().optional(),
  foreign_company_id: z.number().int().min(0).nullable().optional(),

  unit: z.string().max(25).nullable().optional(),

  tax_rate: z.number().min(0).max(100).optional(),

  net_selling_price: z.number().optional(),
  gross_selling_price: z.number().optional(),
  purchase_price: z.number().nullable().optional(),

  comment: z.string().nullable().optional(),
  color: z.string().max(15).nullable().optional(),

  quick_edit: z.boolean().optional(),
  bill_reference: z.boolean().optional(),

  min_stocks: z.number().min(0).optional(),

  stock_status: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),

  negative_stock: z.boolean().optional(),

  status: z.enum(['active', 'inactive']).optional(),

  image_url: z.string().max(255).nullable().optional(),

  take_away_price_differs: z.boolean().optional(),

  take_away_net_selling_price: z.number().nullable().optional(),
  take_away_gross_selling_price: z.number().nullable().optional(),
  take_away_tax_rate: z.number().min(0).max(100).nullable().optional(),
})

export type UpdateArticleParams = z.input<typeof UpdateArticleSchema>
export const { getDummyUpdateArticle, safeParseUpdateArticle, validateUpdateArticle } = useSchema(UpdateArticleSchema, 'UpdateArticle')

const UpdateArticleIdSchema = z.number().int()

const UpdateArticleResponseSchema = createResourceResponseSchema(ArticleDetailResourceSchema)

/**
 * Updates an existing article by its unique ID.
 *
 * Supports updating article identification, prices, tax rates,
 * category and supplier associations, inventory settings,
 * take-away pricing, and other article properties.
 *
 * All request properties are optional. Only explicitly
 * provided values are sent to the API.
 *
 * Updating gross_selling_price or tax_rate causes the API
 * to recalculate net_selling_price. Take-away pricing
 * follows the same behavior.
 *
 * When explicitly providing a net selling price alongside
 * the corresponding gross price and tax rate, the net price
 * must match the server-calculated value within 0.01.
 *
 * @param id - The unique ID of the article to update.
 * @param article - The article properties to update.
 * @returns The updated article, including pricing,
 *          inventory information, references, and timestamps.
 * @throws {z.ZodError} If the article ID, request body,
 *         or API response is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/articles/{id}
 */
export async function updateArticle(id: z.infer<typeof UpdateArticleIdSchema>, article: UpdateArticleParams): Promise<ArticleDetailResource> {
  const articleId = UpdateArticleIdSchema.parse(id)
  const body = UpdateArticleSchema.parse(article)

  const response = await PUT<z.input<typeof UpdateArticleResponseSchema>>(`articles/${articleId}`, body)

  const { data } = UpdateArticleResponseSchema.parse(response)

  return data
}
