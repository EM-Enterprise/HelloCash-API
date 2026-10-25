import { ArticleCategoryResourceSchema } from '@/schemas/article-category/ArticleCategoryResource'
import { ArticleResourceSchema } from '@/schemas/article/ArticleResource'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents the category associated with an article.
 *
 * Contains only the category's identifier and name,
 * rather than the complete ArticleCategoryResource.
 */
export const ArticleCategoryReferenceSchema = ArticleCategoryResourceSchema.pick({ id: true, name: true })

export type ArticleCategoryReference = z.infer<typeof ArticleCategoryReferenceSchema>

/**
 * Represents a foreign company associated with an article.
 *
 * Foreign companies can be linked to articles that are
 * billed as transitory items.
 */
export const ArticleForeignCompanySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  tax_number: z.string().nullable(),
  uid_number: z.string().nullable(),
})

export type ArticleForeignCompany = z.infer<typeof ArticleForeignCompanySchema>

/**
 * Represents the detailed information of an article.
 *
 * Extends ArticleResourceSchema with category and supplier
 * references, inventory settings, takeaway pricing,
 * foreign-company information, and timestamps.
 *
 * ISO date-time strings are automatically transformed
 * into JavaScript Date objects during parsing.
 */
export const ArticleDetailResourceSchema = ArticleResourceSchema.safeExtend({
  category_id: z.number().int().nullable(),
  supplier_id: z.number().int().nullable(),
  manufacturer_id: z.number().int().nullable(),
  foreign_company_id: z.number().int().nullable(),

  comment: z.string(),
  color: z.string(),
  quick_edit: z.boolean(),
  bill_reference: z.boolean(),
  image_url: z.string(),

  stocks: z.number(),
  min_stocks: z.number(),
  negative_stock: z.boolean(),
  stock_status: z.number().int(),

  take_away_price_differs: z.boolean(),
  take_away_net_selling_price: z.number().nullable(),
  take_away_gross_selling_price: z.number().nullable(),
  take_away_tax_rate: z.number().nullable(),

  category: ArticleCategoryReferenceSchema.nullable(),
  foreign_company: ArticleForeignCompanySchema.nullable(),

  created_at: DateTimeSchema.nullable(),
  updated_at: DateTimeSchema.nullable(),
})

export type ArticleDetailResource = z.infer<typeof ArticleDetailResourceSchema>

export const { getDummyArticleDetailResource, safeParseArticleDetailResource, validateArticleDetailResource } = useSchema(ArticleDetailResourceSchema, 'ArticleDetailResource')
