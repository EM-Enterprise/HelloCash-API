import { z } from 'zod'

/**
 * Recursively unwraps ZodDefault<T> and returns a schema with the same shape but without the `.default()` wrappers.
 * @internal
 */
export type StripZodDefault<T extends z.ZodTypeAny> =
  // If it's a ZodDefault wrapper, unwrap its inner type and strip that too
  T extends z.ZodDefault<infer Inner>
    ? StripZodDefault<Inner>
    : // If it's a ZodObject, reconstruct the shape
      T extends z.ZodObject<infer Shape, infer UnknownKeys, infer Catchall>
      ? z.ZodObject<{ [K in keyof Shape]: StripZodDefault<Shape[K]> }, UnknownKeys, Catchall>
      : // If it's a ZodArray, strip the element type
        T extends z.ZodArray<infer Element, infer ArrayCardinality>
        ? z.ZodArray<StripZodDefault<Element>, ArrayCardinality>
        : // If it's an optional, strip what's inside the optional
          T extends z.ZodOptional<infer InnerOpt>
          ? z.ZodOptional<StripZodDefault<InnerOpt>>
          : // If it's a nullable, strip what's inside the nullable
            T extends z.ZodNullable<infer InnerNull>
            ? z.ZodNullable<StripZodDefault<InnerNull>>
            : // If it's a union, intersection, effects, etc., you could handle them here similarly
              // For now we leave them as-is:
              T

/**
 * Recursively unwraps ZodDefault<T> and returns a schema with the same shape but without the `.default()` wrappers.
 * @param schema
 * @internal
 */
export function stripZodDefault<Schema extends z.ZodTypeAny>(schema: Schema): StripZodDefault<Schema> {
  if (schema instanceof z.ZodDefault) {
    // returns the inner type to remove the default
    return stripZodDefault(schema._def.innerType)
  } else if (schema instanceof z.ZodObject) {
    const shape: Record<string, z.ZodTypeAny> = {}
    for (const key in schema.shape) {
      shape[key] = stripZodDefault(schema.shape[key])
    }
    // re-construct ZodObject with stripped shape
    return z.object(shape) as StripZodDefault<Schema>
  } else if (schema instanceof z.ZodArray) {
    return z.array(stripZodDefault(schema.element)) as StripZodDefault<Schema>
  } else if (schema instanceof z.ZodOptional) {
    return z.optional(stripZodDefault(schema.unwrap())) as StripZodDefault<Schema>
  }
  // ... handle other variants if needed

  return schema as StripZodDefault<Schema> // base case, return unchanged
}
