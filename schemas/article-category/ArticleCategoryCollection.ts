import { ArticleCategoryResourceSchema } from '@/schemas/article-category/ArticleCategoryResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ArticleCategoryCollectionSchema = createCollectionSchema(ArticleCategoryResourceSchema)

export type ArticleCategoryCollection = z.infer<typeof ArticleCategoryCollectionSchema>
export const { getDummyArticleCategoryCollection, safeParseArticleCategoryCollection, validateArticleCategoryCollection } = useSchema(ArticleCategoryCollectionSchema, 'ArticleCategoryCollection')
