import { ArticleStockChangeResourceSchema } from '@/schemas/article/stock-changes/ArticleStockChangeResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ArticleStockChangeCollectionSchema = createCollectionSchema(ArticleStockChangeResourceSchema)

export type ArticleStockChangeCollection = z.infer<typeof ArticleStockChangeCollectionSchema>
export const { getDummyArticleStockChangeCollection, safeParseArticleStockChangeCollection, validateArticleStockChangeCollection } = useSchema(
  ArticleStockChangeCollectionSchema,
  'ArticleStockChangeCollection',
)
