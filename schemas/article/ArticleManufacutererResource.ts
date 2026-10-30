import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents an ArticleManufacturer returned by the API.
 *
 * Includes ArticleManufacturer identification, id, name and status
 *
 */
export const ArticleManufacturerResourceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  status: z.string(),
})

export type ArticleManufacturerResource = z.infer<typeof ArticleManufacturerResourceSchema>

export const { getDummyArticleManufacturerResource, safeParseArticleManufacturerResource, validateArticleManufacturerResource } = useSchema(
  ArticleManufacturerResourceSchema,
  'ArticleManufacturerResource',
)
