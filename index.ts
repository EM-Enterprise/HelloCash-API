import GET from './api/GET'
import { Article } from './typings/Article'
import { ArticleCategory, RawArticleCategory } from './typings/Category'
import { Customer } from './typings/Customer'
import { Invoice, RawInvoices } from './typings/Invoice'
import { RawStockChange, StockChange } from './typings/StockChange'
import { getInvoices } from '@/functions/invoices/getInvoices'
import parseInvoice from '@/functions/invoices/parseInvoice'

/**
 * This function returns the buy-history for given array of article-ids.
 * The history is in the form of a map, where each customer that has bought
 * at least one of the articles in question represents a key. In case articles
 * were bought but no customer was referenced then they are accessible with the key 'unknown'.
 * @param ids
 */
export async function getBuyHistory(ids: Array<Article['id']>) {
  const invoices = await getInvoices()
  const relevantInvoices = invoices.filter((i) => i.items.find((i) => ids.includes(i.id)))
  const history = new Map<Customer | 'unknown', Array<Invoice>>()

  relevantInvoices.forEach((i) => {
    const customerHistory = history.get(i.customer ?? 'unknown') ?? []
    customerHistory.push(i)
    history.set(i.customer ?? 'unknown', customerHistory)
  })

  return history
}

export async function getCategories() {
  const { categories } = await GET<RawArticleCategory>('articles/categories')

  return categories.map(
    (cat): ArticleCategory => ({
      id: cat.article_category_id,
      name: cat.article_category_name,
    }),
  )
}

export async function getStockChanges(id: Article['id']) {
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

export async function getInvoiceBase64(invoice_id: Invoice['_id']) {
  const { pdf_base64_encoded } = await GET<{ pdf_base64_encoded: string }>(`invoices/${invoice_id}/pdf`, ['locale=de_DE'])
  return pdf_base64_encoded
}

export async function findInvoiceById(invoice_id: Invoice['id']): Promise<Invoice | null> {
  interface Response {
    invoices: RawInvoices['invoices']
    count: string
    limit: number
    offset: number
  }

  const resp = await GET<Response>('invoices', ['limit=10', `search=${invoice_id}`, 'showDetails=true'])
  if (resp.invoices.length === 0) return null

  const _invoice: RawInvoices['invoices'][number] = resp.invoices.at(0)!
  return parseInvoice(_invoice)
}
