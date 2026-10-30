import { z } from 'zod'

/**
 * Creates a Zod schema for an API response containing a single
 * resource wrapped inside a `data` property.
 *
 * The resource schema is used to validate and transform the
 * response data. Any transformations defined in the resource
 * schema are preserved, including date-time conversions.
 *
 * @template T - The Zod schema type of the resource.
 *
 * @param resourceSchema - The schema used to validate and
 *                         transform the response resource.
 *
 * @returns A Zod object schema containing a required `data`
 *          property matching the provided resource schema.
 *
 * @example
 * ```ts
 * const UserSchema = z.object({
 *   id: z.number().int(),
 *   name: z.string(),
 * });
 *
 * const UserResponseSchema = createResourceResponseSchema(UserSchema);
 *
 * const response = UserResponseSchema.parse({
 *   data: { id: 1, name: "John" },
 * });
 *
 * console.log(response.data.name); // "John"
 * ```
 */
export function createResourceResponseSchema<T extends z.ZodType>(resourceSchema: T) {
  return z.object({
    data: resourceSchema,
  })
}
