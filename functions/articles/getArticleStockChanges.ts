import GET from '@/api/GET'
import { RawStockChange, StockChange } from '@/typings/StockChange'
import { Article } from '@/schemas/Article'

export default async function getArticleStockChanges(id: Article['id']) {
  const changes = await GET<RawStockChange[]>(`articles/${id}/stock-changes`)

  return changes.map(
    (change): StockChange => ({
      id: parseInt(change.stock_id),
      timestamp: new Date(Date.parse(change.stock_timestamp)),
      change: parseInt(change.stock_change),
      invoice_id: parseInt(change.stock_invoice_number),
      article_id: parseInt(change.stock_article_id),
      description: change.stock_description.trim().length > 0 ? change.stock_description : null,
      delivery_number: change.stock_delivery_note_number.trim().length > 0 ? parseInt(change.stock_delivery_note_number) : null,
    }),
  )
}
