import { getDummyRawArticle } from '@/schemas/article/RawArticle'
import { parseRawArticle } from '@/functions/articles/parseRawArticle'

describe('#parseRawArticle', () => {
  test('check that numerical values are parsed correctly', async () => {
    const rawArticle = getDummyRawArticle()
    rawArticle.article_id = '1'
    rawArticle.article_gross_sellingPrice = '10.5'

    const article = parseRawArticle(rawArticle)
    expect(article.id).toBe(1)
    expect(article.price).toBe(10.5)
  })

  test('check that undefined values are parsed such', async () => {
    const rawArticle = getDummyRawArticle()
    rawArticle.article_id = undefined
    rawArticle.article_gross_sellingPrice = undefined

    const article = parseRawArticle(rawArticle)
    expect(article.id).toBe(undefined)
    expect(article.price).toBe(undefined)
  })

  test('check that the article_comment is parsed correctly, when it is defined', () => {
    const rawArticle = getDummyRawArticle()
    rawArticle.article_comment = 'This is a comment.\r\nThis is another comment.'

    const article = parseRawArticle(rawArticle)
    expect(article.comments).toEqual(['This is a comment.', 'This is another comment.'])
  })

  test('check that the article_comment is parsed correctly, when it is not defined', () => {
    const rawArticle = getDummyRawArticle()
    rawArticle.article_comment = undefined

    const article = parseRawArticle(rawArticle)
    expect(article.comments).toEqual([])
  })
})
