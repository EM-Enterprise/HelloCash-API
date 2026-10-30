import { ArticleResourceSchema } from '@/schemas/article/ArticleResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ArticleCollectionSchema = createCollectionSchema(ArticleResourceSchema)

export type ArticleCollection = z.infer<typeof ArticleCollectionSchema>
export const { getDummyArticleCollection, safeParseArticleCollection, validateArticleCollection } = useSchema(ArticleCollectionSchema, 'ArticleCollection')
