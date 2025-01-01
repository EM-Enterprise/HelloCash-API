import GET from '@/api/GET'
import { ArticleStockChange } from '@/schemas/ArticleStockChanges'
import { Article } from '@/schemas/article/Article'
import { RawStockChange } from '@/schemas/article/stock-changes/RawStockChange'

export default async function getArticleStockChanges(id: Article['id']) {
  const changes = await GET<RawStockChange[]>(`articles/${id}/stock-changes`)

  return changes.map(
    (change): ArticleStockChange => ({
      id: parseInt(change.stock_id),
      timestamp: change.stock_timestamp,
      change: parseInt(change.stock_change),
      invoice_id: parseInt(change.stock_invoice_number),
      article_id: parseInt(change.stock_article_id),
      description: change.stock_description,
      delivery_number: change.stock_delivery_note_number,
    }),
  )
}
