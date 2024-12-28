import { z } from 'zod'

/**
 * Returns a default values for a given schema.
 * @param schema The schema to generate default values for.
 */
export default function schemaDefaults<Schema extends z.ZodFirstPartySchemaTypes>(schema: Schema): z.TypeOf<Schema> {
  switch (schema._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodDefault:
      return schema._def.defaultValue()

    case z.ZodFirstPartyTypeKind.ZodObject: {
      return Object.fromEntries(Object.entries((schema as z.SomeZodObject).shape).map(([key, value]) => [key, schemaDefaults(value)]))
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
      const elements = Array.from({ length: Math.random() * 10 + 1 }).map(() => schemaDefaults(elementSchema)) as z.TypeOf<Schema>
      return elements
    }

    case z.ZodFirstPartyTypeKind.ZodOptional:
      return undefined

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
