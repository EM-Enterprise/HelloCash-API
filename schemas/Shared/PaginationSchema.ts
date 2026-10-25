import { z } from 'zod'

/**
 * @internal
 */
export const PaginationSchema = z.object({
  total: z.number().int(),
  limit: z.number().int(),
  offset: z.number().int(),
  has_more: z.boolean(),
})

export type Pagination = z.infer<typeof PaginationSchema>
