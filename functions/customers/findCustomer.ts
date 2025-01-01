import getCustomers from '@/functions/customers/getCustomers'
import { Customer } from '@/schemas/customer/Customer/Customer'

/**
 * This function looks for duplicate users based on the given user. In doing so it checks exact matches, partial address matches and partial name matches.
 * @param user The user-data that is being checked for duplicates.
 * @returns An array of users that match or partially match the given user-data.
 */
export default async function findCustomer(user: Partial<Customer>) {
  const customers = await getCustomers()

  const exactMatches = customers.filter((customer) =>
    Object.keys(user)
      .map((_key) => {
        const key = _key as keyof Customer
        return customer[key] === user[key]
      })
      .every((el) => el),
  )

  const partialAddressMatches = customers.filter(
    (customer) =>
      customer.country?.trim() === user.country?.trim() &&
      customer.city?.trim() === user.city?.trim() &&
      customer.postCode?.trim() === user.postCode?.trim() &&
      customer.street?.trim() === user.street?.trim() &&
      customer.houseNumber?.trim() === user.houseNumber?.trim(),
  )
  const partialNameMatches = customers.filter((customer) => customer.firstName?.trim() === user.firstName?.trim() && customer.lastName?.trim() === user.lastName?.trim())

  //? Combine all matches and remove duplicates
  return [...exactMatches, ...partialAddressMatches, ...partialNameMatches].filter((v, i, a) => a.indexOf(v) === i)
}
