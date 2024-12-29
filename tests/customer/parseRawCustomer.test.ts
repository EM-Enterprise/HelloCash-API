import { describe } from '@jest/globals'
import { CustomerSchema, RawCustomer, RawCustomerSchema } from '@/schemas/Customer'
import parseRawCustomer from '@/functions/customers/parseRawCustomer'
import { ZodError } from 'zod'
import schemaDefaults from '@/schemas/SchemaDefaults'

describe('#ParseRawCustomer - ', () => {
  test('check parsing of valid raw-customer data', () => {
    const customer = parseRawCustomer(schemaDefaults(RawCustomerSchema))

    expect(CustomerSchema.safeParse(customer).success).toBe(true)
  })

  test('should throw an error if the raw customer data is invalid', () => {
    const rawCustomer = {} as RawCustomer
    expect(() => parseRawCustomer(rawCustomer)).toThrow(ZodError)
  })

  test('should throw an error if the raw customer is missing properties', () => {
    const rawCustomer = schemaDefaults(RawCustomerSchema) as Partial<RawCustomer>
    delete rawCustomer.user_id
    expect(() => parseRawCustomer(rawCustomer as RawCustomer)).toThrow(ZodError)
  })
})
