import { z } from 'zod'
import { stripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import schemaDefaults, { SchemaOptionalProps } from '@/schemas/utils/schemaDefaults'

type SchemaUtils<Type> = {
  validateObject: (object: unknown) => Type
  safeParseObject: (object: unknown) => z.ZodSafeParseResult<Type>
  getDummyObject: (options?: SchemaOptionalProps) => Type
}

type NamedSchemaUtils<Type, Name extends string> = {
  [Key in `validate${Name}`]: SchemaUtils<Type>['validateObject']
} & {
  [Key in `safeParse${Name}`]: SchemaUtils<Type>['safeParseObject']
} & {
  [Key in `getDummy${Name}`]: SchemaUtils<Type>['getDummyObject']
}

/**
 * Provides schema-bound validation, safe parsing, and dummy object creation.
 * When a name is provided, returns methods with schema-specific property names.
 */
export function useSchema<Schema extends z.ZodType, const Name extends string>(schema: Schema, name: Name): NamedSchemaUtils<z.infer<Schema>, Name>

/** Retains the original API, including explicit type arguments. */
export function useSchema<Type>(schema: z.ZodType): SchemaUtils<Type>

export function useSchema(schema: z.ZodType, name?: string) {
  const strippedSchema = stripZodDefault(schema)

  const validateObject = (object: unknown) => strippedSchema.parse(object)

  function getDummyObject(options?: SchemaOptionalProps) {
    return schemaDefaults(schema, options)
  }

  const safeParseObject = (object: unknown) => strippedSchema.safeParse(object)

  if (name === undefined) {
    return { getDummyObject, validateObject, safeParseObject }
  }

  return {
    [`validate${name}`]: validateObject,
    [`safeParse${name}`]: safeParseObject,
    [`getDummy${name}`]: getDummyObject,
  }
}
