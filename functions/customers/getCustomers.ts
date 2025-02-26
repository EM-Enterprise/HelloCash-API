import GET from '@/api/GET'
import { Customer } from '@/schemas/customer/Customer'
import parseRawCustomer from '@/functions/customers/parseRawCustomer'
import { RawCustomers } from '@/schemas/customer/RawCustomers'

export default async function getCustomers(limit: number = -1) {
  let customers: Array<Customer> = []
  let pastRetrieval = 0
  do {
    let queryAmount = limit - customers.length

    if (limit === -1) queryAmount = 1000
    else if (queryAmount > 1000) queryAmount = 1000

    const { users } = await GET<RawCustomers>('users', [`limit=${queryAmount}`])

    customers.push(...users.map((rawCustomer): Customer => parseRawCustomer(rawCustomer)))
    pastRetrieval = users.length
  } while (customers.length < limit && pastRetrieval > 0)

  return customers
}
