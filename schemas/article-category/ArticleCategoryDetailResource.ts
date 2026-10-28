import { ArticleCategoryResourceSchema } from '@/schemas/article-category/ArticleCategoryResource'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export type ArticleCategoryDetailResource = z.infer<typeof ArticleCategoryResourceSchema>

export const { getDummyArticleCategoryDetailResource, safeParseArticleCategoryDetailResource, validateArticleCategoryDetailResource } = useSchema(
  ArticleCategoryResourceSchema,
  'ArticleCategoryDetailResource',
)
