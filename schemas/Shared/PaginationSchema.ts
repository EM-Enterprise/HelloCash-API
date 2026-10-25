import { z } from 'zod'

/**
 * @internal
 */
export const PaginationParamsSchema = z.object({
  limit: z.number().int().min(1).max(250).default(25),
  offset: z.number().int().min(0).default(0),
})

/**
 * @internal
 */
export const PaginationCollectionSchema = z.object({
  total: z.number().int(),
  limit: z.number().int().min(1).max(250).default(25),
  offset: z.number().int().min(0).default(0),
  has_more: z.boolean(),
})

export type PaginationCollection = z.infer<typeof PaginationCollectionSchema>
export type PaginationParams = z.infer<typeof PaginationParamsSchema>
