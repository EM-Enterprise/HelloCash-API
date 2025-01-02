import { describe } from '@jest/globals'
import parseRawCustomer from '@/functions/customers/parseRawCustomer'
import { ZodError } from 'zod'
import { getDummyRawCustomer, RawCustomer } from '@/schemas/customer/RawCustomer'
import { safeParseCustomer } from '@/schemas/customer/Customer'

describe('#ParseRawCustomer - ', () => {
  test('check parsing of valid raw-customer data', () => {
    const customer = parseRawCustomer(getDummyRawCustomer())

    expect(safeParseCustomer(customer).success).toBe(true)
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

  test('should parse null values correctly', () => {
    const rawCustomer = getDummyRawCustomer()
    rawCustomer.user_city = null
    const customer = parseRawCustomer(rawCustomer)

    expect(customer.city, 'Expect customer city (null) to be undefined after parsing').toBeUndefined()
  })
})
