export interface ArticleCategory {
  id: number
  name: string
}

export interface RawArticleCategory {
  categories: Array<{
    article_category_id: number,
    article_parent_category_id: number | null,
    article_category_name: string
  }>
}