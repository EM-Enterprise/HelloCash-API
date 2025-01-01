import getArticles from '../../functions/articles/getArticles'
import { beforeEach } from '@jest/globals'
import * as dotenv from 'dotenv'
import { getAuthorization, setAuthorization } from '@/config/authorization'
import schemaDefaults from '@/schemas/SchemaDefaults'
import { RawArticles, RawArticleSchema, RawArticlesSchema } from '@/schemas/article/Article'

dotenv.config()

const mockGet = jest.requireActual('@/api/GET')
jest.spyOn(mockGet, 'default').mockImplementation((...args) => {
  const filters = args[1] as string[]
  let limitFilter = filters
    .find((filter) => filter.includes('limit='))
    ?.split('=')
    .at(1)

  if (!limitFilter) return new Promise((resolve, rejects) => rejects('Could not find limit filter in GET filter params.'))

  let limit = parseInt(limitFilter)

  return new Promise((resolve, rejects) => {
    try {
      getAuthorization()
    } catch (err) {
      rejects(err)
    }

    const response: RawArticles = schemaDefaults(RawArticlesSchema)
    response.articles = Array.from({ length: limit === -1 ? 1000 : limit }).map(() => schemaDefaults(RawArticleSchema))

    resolve(response)
  })
})

beforeEach(() => {
  setAuthorization(process.env.AUTH_TOKEN!)
})

test('No Authentication set; Expect Authentication Failure', async () => {
  setAuthorization(undefined!)
  await expect(getArticles()).rejects.toThrow(ReferenceError)
  await expect(getArticles()).rejects.toThrow('Missing Authorization Token. Use setAuthorization() to set the authenticationToken.')
})

test('getArticles limit 10, Expect 10 articles', async () => {
  await expect(getArticles(10)).resolves.toHaveLength(10)
})

test('getArticles limit 0, Expect 0 articles', async () => {
  await expect(getArticles(0)).resolves.toHaveLength(0)
})

test('getArticles limit 1000, Expect at least 0 items', async () => {
  const articles = await getArticles(1000)
  expect(Array.isArray(articles)).toBe(true)
  expect(articles.length).toBeGreaterThan(0)
})

test('getArticles limit -1, Expect at least 0 items.', async () => {
  const articles = await getArticles(-1)
  expect(Array.isArray(articles)).toBe(true)
  expect(articles.length).toBeGreaterThan(0)
})
