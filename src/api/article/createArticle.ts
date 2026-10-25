import POST from '@/fetch/POST'
import { ArticleDetailResourceSchema, ArticleDetailResource } from '@/schemas/article/ArticleDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Validates the request body for creating an article.
 *
 * The API requires an article name, tax rate, net selling
 * price, and gross selling price.
 *
 * Other properties are optional and use the API's
 * documented constraints and defaults.
 *
 * Selling prices must be consistent with the tax rate.
 * The server calculates and stores monetary values with
 * four decimal places.
 */
const CreateArticleSchema = z.object({
  name: z.string().min(1).max(150),

  tax_rate: z.number().min(0).max(100),

  net_selling_price: z.number(),
  gross_selling_price: z.number(),

  category_id: z.number().int().min(0).nullable().optional(),

  short_name: z.string().max(26).nullable().optional(),
  code: z.string().max(20).nullable().optional(),
  ean_code: z.string().max(40).nullable().optional(),

  supplier_id: z.number().int().min(0).nullable().optional(),
  manufacturer_id: z.number().int().min(0).nullable().optional(),
  foreign_company_id: z.number().int().min(0).nullable().optional(),

  unit: z.string().max(25).nullable().optional(),

  purchase_price: z.number().nullable().optional(),

  comment: z.string().nullable().optional(),
  color: z.string().max(16).nullable().optional(),

  quick_edit: z.boolean().default(false),
  bill_reference: z.boolean().default(false),

  min_stocks: z.number().min(0).default(0),

  stock_status: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),

  negative_stock: z.boolean().default(false),

  status: z.enum(['active', 'inactive']).default('active'),

  image_url: z.string().max(255).nullable().optional(),

  take_away_price_differs: z.boolean().default(false),

  take_away_net_selling_price: z.number().nullable().optional(),
  take_away_gross_selling_price: z.number().nullable().optional(),
  take_away_tax_rate: z.number().min(0).max(100).nullable().optional(),
})

export type CreateArticleParams = z.input<typeof CreateArticleSchema>

export const { getDummyCreateArticleParams, safeParseCreateArticleParams, validateCreateArticleParams } = useSchema(CreateArticleSchema, 'CreateArticleParams')

const CreateArticleResponseSchema = createResourceResponseSchema(ArticleDetailResourceSchema)

/**
 * Creates a new article in the company's catalogue.
 *
 * Supports article identification, pricing, tax rates,
 * category and supplier associations, stock management,
 * and optional take-away pricing.
 *
 * Net selling prices are validated against gross prices
 * and applicable tax rates before sending the request.
 * The API performs the authoritative calculation and
 * stores selling prices with four decimal places.
 *
 * @param article - The article properties to create.
 * @returns The newly created article, including its ID,
 *          pricing, inventory settings, references,
 *          and creation/update timestamps.
 * @throws {z.ZodError} If the request body or API response
 *         is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/articles
 */
export default async function createArticle(article: CreateArticleParams): Promise<ArticleDetailResource> {
  const body = CreateArticleSchema.parse(article)

  const response = await POST<z.input<typeof CreateArticleResponseSchema>>('articles', body)

  const { data } = CreateArticleResponseSchema.parse(response)

  return data
}
