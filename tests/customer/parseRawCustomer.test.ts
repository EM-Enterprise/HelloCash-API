import { describe } from '@jest/globals'
import parseRawCustomer from '@/functions/customers/parseRawCustomer'
import { ZodError } from 'zod'
import { getDummyRawCustomer, RawCustomer } from '@/schemas/customer/RawCustomer'
import { CustomerSchema } from '@/schemas/customer/Customer'

describe('#ParseRawCustomer - ', () => {
  test('check parsing of valid raw-customer data', () => {
    const customer = parseRawCustomer(getDummyRawCustomer())

    expect(CustomerSchema.safeParse(customer).success).toBe(true)
  })

  test('should throw an error if the raw customer data is invalid', () => {
    const rawCustomer = {} as RawCustomer
    expect(() => parseRawCustomer(rawCustomer)).toThrow(ZodError)
  })

  test('should throw an error if the raw customer is missing properties', () => {
    const rawCustomer = getDummyRawCustomer() as Partial<RawCustomer>
    delete rawCustomer.user_id
    expect(() => parseRawCustomer(rawCustomer as RawCustomer)).toThrow(ZodError)
  })
})
