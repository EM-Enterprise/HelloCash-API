import { Customer, RawCustomers } from '@/typings/Customer'
import POST from '@/api/POST'

export default async function createCustomer(customer: Partial<Omit<Customer, 'timestamp' | 'id'>>): Promise<RawCustomers['users'][number]> {
  const rawUser: Partial<Omit<RawCustomers['users'][number], 'user_id' | 'user_timestamp' | 'user_custom_fields'>> = {
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

  return await POST<RawCustomers['users'][number]>('users', rawUser)
}
