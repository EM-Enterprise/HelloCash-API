import { z } from 'zod'

export const ArticleCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type ArticleCategory = z.infer<typeof ArticleCategorySchema>
