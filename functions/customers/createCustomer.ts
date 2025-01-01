import POST from '@/api/POST'
import { Customer } from '@/schemas/customer/Customer'
import { RawCustomer } from '@/schemas/customer/RawCustomer'

export default async function createCustomer(customer: Partial<Omit<Customer, 'timestamp' | 'id'>>): Promise<RawCustomer> {
  const rawUser: Partial<Omit<RawCustomer, 'user_id' | 'user_timestamp' | 'user_custom_fields'>> = {
    user_salutation: customer.salutation,
    user_firstname: customer.firstName,
    user_surname: customer.lastName,
    user_email: customer.email,
    user_phoneNumber: customer.phone,
    user_country: customer.country,
    user_city: customer.city,
    user_postalCode: customer.postCode,
    user_street: customer.street,
    user_houseNumber: customer.houseNumber,
    user_birthday: customer.birthday,
    user_notes: customer.notes?.join('\\n'),
  }

  return await POST<RawCustomer>('users', rawUser)
}
