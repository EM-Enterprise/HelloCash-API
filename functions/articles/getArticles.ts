import GET from '@/api/GET'
import { RawArticles } from '@/schemas/article/RawArticles'
import { Article } from '@/schemas/article/Article'
import { parseRawArticle } from '@/functions/articles/parseRawArticle'

export default async function getArticles(limit: number = 1000): Promise<Article[]> {
  if (limit === 0) return []
  if (limit < 0) limit = 1000

  const { articles } = await GET<RawArticles>('articles', [`limit=${limit}`])

  return articles.map(parseRawArticle)
}
