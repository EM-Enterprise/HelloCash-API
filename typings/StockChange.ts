import { Article } from "./Article"
import { Invoice } from "./Invoice"

export  interface StockChange {
  id: number
  article_id: Article['id']
  timestamp: Date
  change: number
  invoice_id: Invoice['id']
  description: 'Verkauf' | 'Anfangsbestand' | 'Stornierung (Nr: ...)' | string | null
  delivery_number: number | null
}

export interface RawStockChange {
  stock_id: string
  stock_article_id: string
  stock_timestamp: string
  stock_change: string
  stock_invoice_number: string
  stock_delivery_note_number: string
  stock_description: string
}