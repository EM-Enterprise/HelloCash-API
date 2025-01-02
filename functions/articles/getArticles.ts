import GET from '@/api/GET'
import { RawArticles } from '@/schemas/article/RawArticles'
import { Article } from '@/schemas/article/Article'

function parseNumber(raw: string | undefined): number | undefined {
  if (!raw) return undefined

  return parseFloat(raw)
}

export default async function getArticles(limit: number = 1000): Promise<Article[]> {
  if (limit === 0) return []
  if (limit < 0) limit = 1000

  const { articles } = await GET<RawArticles>('articles', [`limit=${limit}`])

  return articles.map(
    (a): Article => ({
      id: parseNumber(a.article_id),
      name: a.article_name,
      price: parseNumber(a.article_gross_sellingPrice),
      netPrices: {
        purchasePrice: parseNumber(a.article_net_purchacePrice),
        sellingPrice: parseNumber(a.article_net_sellingPrice),
      },
      stock: parseNumber(a.article_stock),
      code: a.article_code,
      taxClass: parseNumber(a.article_taxRate),
      comments: a.article_comment?.split('\r\n') ?? [],
      category_id: a.article_category_id,
    }),
  )
}
