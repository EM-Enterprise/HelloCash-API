import GET from '@/api/GET'
import { Article } from '@/schemas/Article'
import { ArticleStockChange, RawArticleStockChange } from '@/schemas/ArticleStockChanges'

export default async function getArticleStockChanges(id: Article['id']) {
  const changes = await GET<RawArticleStockChange[]>(`articles/${id}/stock-changes`)

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
