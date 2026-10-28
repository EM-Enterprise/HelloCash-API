import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents an article category returned by the API.
 *
 * Contains the category's unique identifier, name,
 * status, and sorting position.
 */
export const ArticleCategoryResourceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  status: z.string(),
  sort: z.number().int(),
})

export type ArticleCategoryResource = z.infer<typeof ArticleCategoryResourceSchema>

export const { getDummyArticleCategoryResource, safeParseArticleCategoryResource, validateArticleCategoryResource } = useSchema(ArticleCategoryResourceSchema, 'ArticleCategoryResource')
