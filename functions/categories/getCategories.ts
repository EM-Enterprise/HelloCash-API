import GET from '@/api/GET'
import { ArticleCategory, RawArticleCategory } from '@/typings/Category'

export default async function getCategories() {
  const { categories } = await GET<RawArticleCategory>('articles/categories')

  return categories.map(
    (cat): ArticleCategory => ({
      id: cat.article_category_id,
      name: cat.article_category_name,
    }),
  )
}
