export interface Article {
  id: number
  name: string
  code: string
  taxClass: number
  price: number
  netPrices: {
    purchasePrice: number
    sellingPrice: number
  }
  stock: number
  comments: Array<string>
  category_id: number | null
}

export interface RawArticles {
  articles: Array<{
    article_id: string
    article_category_id: number | null
    article_name: string
    article_code: string
    article_eanCode: string
    article_taxRate: string
    article_unit: string
    article_net_purchacePrice: string
    article_net_sellingPrice: string
    article_gross_sellingPrice: string
    article_stock: string
    article_minStock: string
    article_comment: string
    article_billReference: string
    article_color: string
  }>
}
