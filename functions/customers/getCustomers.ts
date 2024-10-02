import { Customer, RawCustomers } from '@/typings/Customer'
import GET from '@/api/GET'

export default async function getCustomers(limit: number = -1) {
  let customers: Array<Customer> = []
  let pastRetrieval = 0
  do {
    let queryAmount = limit - customers.length

    if (limit === -1) queryAmount = 1000
    else if (queryAmount > 1000) queryAmount = 1000

    const { users } = await GET<RawCustomers>('users', [`limit=${queryAmount}`])

    customers.push(
      ...users.map(
        (u): Customer => ({
          id: u.user_id,
          timestamp: u.user_timestamp ? new Date(Date.parse(u.user_timestamp)) : null,
          city: u.user_city,
          country: u.user_country,
          postCode: u.user_postalCode,
          email: u.user_email ?? '',
          firstName: u.user_firstname ?? '',
          lastName: u.user_surname ?? '',
          street: u.user_street,
          houseNumber: u.user_houseNumber ?? '',
          phone: u.user_phoneNumber ?? '',
          salutation: u.user_salutation ?? '',
          birthday: u.user_birthday ?? '',
          notes: u?.user_notes?.replace(/(?:\\r)+/g, '')?.split('\n') ?? null,
          company: u?.user_company,
          uid_number: u?.user_uidNumber,
        }),
      ),
    )
    pastRetrieval = users.length
  } while (customers.length < limit && pastRetrieval > 0)

  return customers
}
