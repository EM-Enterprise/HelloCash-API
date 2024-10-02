import GET from './api/GET'
import POST from './api/POST'
import { Article } from './typings/Article'
import { ArticleCategory, RawArticleCategory } from './typings/Category'
import { Customer, RawCustomers } from './typings/Customer'
import { Invoice, RawInvoices } from './typings/Invoice'
import { RawStockChange, StockChange } from './typings/StockChange'
import { getInvoices } from '@/functions/invoices/getInvoices'
import parseInvoice from '@/functions/invoices/parseInvoice'

export async function getCustomers(limit: number = -1) {
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

/**
 * This function returns the buy-history for given array of article-ids.
 * The history is in the form of a map, where each customer that has bought
 * at least one of the articles in question represents a key. In case articles
 * were bought but no customer was referenced then they are accessible with the key 'unknown'.
 * @param ids
 */
export async function getBuyHistory(ids: Array<Article['id']>) {
  const invoices = await getInvoices()
  const relevantInvoices = invoices.filter((i) => i.items.find((i) => ids.includes(i.id)))
  const history = new Map<Customer | 'unknown', Array<Invoice>>()

  relevantInvoices.forEach((i) => {
    const customerHistory = history.get(i.customer ?? 'unknown') ?? []
    customerHistory.push(i)
    history.set(i.customer ?? 'unknown', customerHistory)
  })

  return history
}

/**
 * This function looks for exact matches of the given customer-data.
 * @param customer The customer-data that is being checked for exact matches.
 * @returns An array of customers that match the given customer-data.
 */
export async function findExactCustomer(customer: Partial<Customer>) {
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

/**
 * This function looks for duplicate users based on the given user. In doing so it checks exact matches, partial address matches and partial name matches.
 * @param user The user-data that is being checked for duplicates.
 * @returns An array of users that match or partially match the given user-data.
 */
export async function findCustomer(user: Partial<Customer>) {
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

export async function createUser(customer: Partial<Omit<Customer, 'timestamp' | 'id'>>): Promise<RawCustomers['users'][number]> {
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

export async function getCategories() {
  const { categories } = await GET<RawArticleCategory>('articles/categories')

  return categories.map(
    (cat): ArticleCategory => ({
      id: cat.article_category_id,
      name: cat.article_category_name,
    }),
  )
}

export async function getStockChanges(id: Article['id']) {
  const changes = await GET<RawStockChange[]>(`articles/${id}/stock-changes`)

  return changes.map(
    (change): StockChange => ({
      id: parseInt(change.stock_id),
      timestamp: new Date(Date.parse(change.stock_timestamp)),
      change: parseInt(change.stock_change),
      invoice_id: parseInt(change.stock_invoice_number),
      article_id: parseInt(change.stock_article_id),
      description: change.stock_description.trim().length > 0 ? change.stock_description : null,
      delivery_number: change.stock_delivery_note_number.trim().length > 0 ? parseInt(change.stock_delivery_note_number) : null,
    }),
  )
}

export async function getInvoiceBase64(invoice_id: Invoice['_id']) {
  const { pdf_base64_encoded } = await GET<{ pdf_base64_encoded: string }>(`invoices/${invoice_id}/pdf`, ['locale=de_DE'])
  return pdf_base64_encoded
}

export async function findInvoiceById(invoice_id: Invoice['id']): Promise<Invoice | null> {
  interface Response {
    invoices: RawInvoices['invoices']
    count: string
    limit: number
    offset: number
  }

  const resp = await GET<Response>('invoices', ['limit=10', `search=${invoice_id}`, 'showDetails=true'])
  if (resp.invoices.length === 0) return null

  const _invoice: RawInvoices['invoices'][number] = resp.invoices.at(0)!
  return parseInvoice(_invoice)
}
