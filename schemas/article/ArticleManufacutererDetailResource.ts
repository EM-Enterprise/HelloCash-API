import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents an ArticleManufacturer returned by the API.
 *
 * Includes ArticleManufacturer identification, id, name and status
 *
 */
export const ArticleManufacturerDetailResourceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  status: z.string(),
})

export type ArticleManufacturerDetailResource = z.infer<typeof ArticleManufacturerDetailResourceSchema>

export const { getDummyArticleManufacturerDetailResource, safeParseArticleManufacturerDetailResource, validateArticleManufacturerDetailResource } = useSchema(
  ArticleManufacturerDetailResourceSchema,
  'ArticleManufacturerDetailResource',
)
