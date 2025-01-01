import GET from '@/api/GET'
import { ArticleCategory } from '@/schemas/ArticleCategory'
import { RawArticleCategories } from '@/schemas/article-category/RawArticleCategories'

export default async function getCategories() {
  const { categories } = await GET<RawArticleCategories>('articles/categories')

  return categories.map(
    (cat): ArticleCategory => ({
      id: cat.article_category_id,
      name: cat.article_category_name,
    }),
  )
}
