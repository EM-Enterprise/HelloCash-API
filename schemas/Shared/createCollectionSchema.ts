import { PaginationSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

/**
 * Creates a paginated collection schema for a given resource.
 *
 * @param resourceSchema - Zod schema used to validate each item.
 * @returns A collection schema with data and pagination properties.
 */
export function createCollectionSchema<T extends z.ZodType>(resourceSchema: T) {
  return z.object({
    data: z.array(resourceSchema),
    pagination: PaginationSchema,
  })
}
