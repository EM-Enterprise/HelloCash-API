import { z, ZodTypeAny } from 'zod'

/**
 * @internal
 */
export interface SchemaOptionalProps {
  includePrimitiveProperties?: boolean
  includeNonPrimitiveProperties?: boolean
}

/**
 * Returns a default values for a given schema.
 * @param schema The schema to generate default values for.
 * @param options,includePrimitiveProperties If true, optinal primitive properties such as strings, numbers, and booleans are going to be instantiated.
 * @param options,includeNonPrimitiveProperties If true, non-primitive properties such as objects and arrays are going to instantiated as well.
 * @internal
 */
export default function schemaDefaults<Schema extends z.ZodFirstPartySchemaTypes>(
  schema: Schema,
  options: SchemaOptionalProps = { includePrimitiveProperties: true, includeNonPrimitiveProperties: false },
): z.TypeOf<Schema> {
  if (options.includePrimitiveProperties === undefined) options.includePrimitiveProperties = true

  switch (schema._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodDefault:
      return schema._def.defaultValue()

    case z.ZodFirstPartyTypeKind.ZodObject: {
      return Object.fromEntries(Object.entries((schema as z.SomeZodObject).shape).map(([key, value]) => [key, schemaDefaults(value, options)]))
    }
    case z.ZodFirstPartyTypeKind.ZodString:
      return ''
    case z.ZodFirstPartyTypeKind.ZodNull:
      return null
    case z.ZodFirstPartyTypeKind.ZodNullable:
      return null
    case z.ZodFirstPartyTypeKind.ZodUndefined:
      return undefined
    case z.ZodFirstPartyTypeKind.ZodUnknown:
      return undefined

    // etc
    case z.ZodFirstPartyTypeKind.ZodArray: {
      const arraySchema = schema as z.ZodArray<any>
      const elementSchema = arraySchema.element
      // Return an array of 1 - 10 elements in the array
      const elements = Array.from({ length: 5 }).map(() => schemaDefaults(elementSchema, options)) as z.TypeOf<Schema>
      return elements
    }

    case z.ZodFirstPartyTypeKind.ZodOptional:
      const strippedOptionalSchema = (schema as z.ZodOptional<ZodTypeAny>).unwrap()

      if (strippedOptionalSchema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray && !options.includeNonPrimitiveProperties) return undefined
      else if (strippedOptionalSchema._def.typeName === z.ZodFirstPartyTypeKind.ZodObject && !options.includeNonPrimitiveProperties) return undefined

      return options.includePrimitiveProperties ? schemaDefaults(strippedOptionalSchema, options) : undefined

    case z.ZodFirstPartyTypeKind.ZodNumber:
      return 0

    case z.ZodFirstPartyTypeKind.ZodBoolean:
      return false

    case z.ZodFirstPartyTypeKind.ZodAny:
      return undefined

    case z.ZodFirstPartyTypeKind.ZodCatch:
      return schema._def.catchValue.call(null, {} as any)

    default:
      throw new Error(`Unsupported type ${schema._type}, ${(schema as any)._def.typeName}`)
  }
}
