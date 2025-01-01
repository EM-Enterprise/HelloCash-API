import { Customer, CustomerSchema, RawCustomer, RawCustomerSchema } from '@/schemas/customer/Customer'

/**
 * Function that receives a given value and returns that value or undefined if the value is null
 * @param raw - The value to be parsed
 * @param callback - A function that will be called if the value is not null, and receives the value as a parameter used to transform the value
 */
function parseNull<V, O = V>(raw: V, callback?: (value: NonNullable<V>) => NonNullable<O>): NonNullable<O> | undefined {
  if (callback && raw) return callback(raw as NonNullable<V>)

  return (raw as unknown as O) ?? undefined
}

/**
 * @internal
 */
export default function parseRawCustomer(raw: RawCustomer): Customer {
  const rawCustomer = RawCustomerSchema.parse(raw)

  const customer: Customer = {
    id: rawCustomer.user_id,
    timestamp: parseNull(rawCustomer.user_timestamp),
    salutation: parseNull(rawCustomer.user_salutation),
    firstName: parseNull(rawCustomer.user_firstname),
    lastName: parseNull(rawCustomer.user_surname),
    email: parseNull(rawCustomer.user_email),
    phone: parseNull(rawCustomer.user_phoneNumber),
    postCode: parseNull(rawCustomer.user_postalCode),
    city: parseNull(rawCustomer.user_city),
    street: parseNull(rawCustomer.user_street),
    houseNumber: parseNull(rawCustomer.user_houseNumber),
    country: parseNull(rawCustomer.user_country),
    company: parseNull(rawCustomer.user_company),
    uid_number: parseNull(rawCustomer.user_uidNumber),
    birthday: parseNull(rawCustomer.user_birthday),

    notes: parseNull<string | null, string[]>(rawCustomer.user_notes, (notes) => notes.split('\n')),
  }

  return CustomerSchema.parse(customer)
}
