import { RawArticle, validateRawArticle } from '@/schemas/article/RawArticle'
import { Article } from '@/schemas/article/Article'

/**
 * Parses a given value that can be either a string or undefined to a number or undefined
 * @param raw
 */
function parseNumber(raw: string | undefined): number | undefined {
  if (!raw) return undefined

  return parseFloat(raw)
}

/**
 * Takes in a raw article object and parses it to an article object. In case of invalid data, an error is thrown.
 * @internal
 */
export function parseRawArticle(rawArticle: RawArticle): Article {
  validateRawArticle(rawArticle)

  return {
    id: parseNumber(rawArticle.article_id),
    name: rawArticle.article_name,
    price: parseNumber(rawArticle.article_gross_sellingPrice),
    netPrices: {
      purchasePrice: parseNumber(rawArticle.article_net_purchacePrice),
      sellingPrice: parseNumber(rawArticle.article_net_sellingPrice),
    },
    stock: parseNumber(rawArticle.article_stock),
    code: rawArticle.article_code,
    taxClass: parseNumber(rawArticle.article_taxRate),
    comments: rawArticle.article_comment?.split('\r\n') ?? [],
    category_id: rawArticle.article_category_id,
  }
}
