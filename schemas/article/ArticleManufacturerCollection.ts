import { ArticleManufacturerResourceSchema } from '@/schemas/article/ArticleManufacutererResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ArticleManufacturerCollectionSchema = createCollectionSchema(ArticleManufacturerResourceSchema)

export type ArticleManufacturerCollection = z.infer<typeof ArticleManufacturerCollectionSchema>
export const { getDummyArticleManufacturerCollection, safeParseArticleManufacturerCollection, validateArticleManufacturerCollection } = useSchema(
  ArticleManufacturerCollectionSchema,
  'ArticleManufacturerCollection',
)
