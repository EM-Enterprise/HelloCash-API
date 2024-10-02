import GET from '@/api/GET'
import { Article, RawArticles } from '@/typings/Article'

export default async function getArticles(limit: number = -1) {
  const { articles } = await GET<RawArticles>('articles', [`limit=${limit}`])

  return articles.map(
    (a): Article => ({
      id: parseInt(a.article_id),
      name: a.article_name,
      price: parseFloat(a.article_gross_sellingPrice),
      netPrices: {
        purchasePrice: parseFloat(a.article_net_purchacePrice),
        sellingPrice: parseFloat(a.article_net_sellingPrice),
      },
      stock: parseFloat(a.article_stock),
      code: a.article_code,
      taxClass: parseFloat(a.article_taxRate),
      comments: a.article_comment?.split('\r\n') ?? [],
      category: a.article_category_id,
    }),
  )
}
