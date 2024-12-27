import { describe } from '@jest/globals'
import { CustomerSchema, RawCustomer } from '@/schemas/Customer'
import parseRawCustomer from '@/functions/utils/parseRawCustomer'
import { ZodError } from 'zod'

const dummyRawCustomer: RawCustomer = {
  user_id: '1',
  user_timestamp: '2021-09-01T12:00:00Z',
  user_salutation: 'Mr.',
  user_firstname: 'John',
  user_surname: 'Doe',
  user_email: 'john.doe@example.com',
  user_birthday: '1990-01-01',
  user_phoneNumber: '1234567890',
  user_postalCode: '12345',
  user_city: 'City',
  user_street: 'Street',
  user_houseNumber: null,
  user_country: 'Country',
  user_company: 'Company',
  user_uidNumber: '1234567890',
  user_notes: 'Note 1\nNote 2',
}

describe('#ParseRawCustomer - ', () => {
  test('check parsing of valid raw-customer data', () => {
    const rawCustomer = dummyRawCustomer
    const customer = parseRawCustomer(rawCustomer)

    expect(CustomerSchema.safeParse(customer).success).toBe(true)
  })

  test('should throw an error if the raw customer data is invalid', () => {
    const rawCustomer = {} as RawCustomer
    expect(() => parseRawCustomer(rawCustomer)).toThrow(ZodError)
  })

  test('should throw an error if the raw customer is missing properties', () => {
    const rawCustomer = dummyRawCustomer as any
    delete rawCustomer.user_id
    expect(() => parseRawCustomer(rawCustomer as RawCustomer)).toThrow(ZodError)
  })
})
