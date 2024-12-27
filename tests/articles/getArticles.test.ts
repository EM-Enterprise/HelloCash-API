import getArticles from '../../functions/articles/getArticles'
import { beforeEach } from '@jest/globals'
import * as dotenv from 'dotenv'
import { setAuthorization } from '@/config/authorization'

dotenv.config()

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