import getCustomers from '@/functions/customers/getCustomers'
import { Customer } from '@/schemas/Customer'

/**
 * This function looks for exact matches of the given customer-data.
 * @param customer The customer-data that is being checked for exact matches.
 * @returns An array of customers that match the given customer-data.
 */
export default async function findExactCustomer(customer: Partial<Customer>) {
  const customers = await getCustomers()

  const exactMatches = customers.filter((c) =>
    Object.keys(customer)
      .map((_key) => {
        const key = _key as keyof Customer

        return c[key]?.toString().trim() === customer[key]?.toString().trim()
      })
      .every((el) => el),
  )

  return exactMatches
}
