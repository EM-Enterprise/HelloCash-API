import { Article } from './typings/Article'
import { Customer } from './typings/Customer'
import { Invoice } from './typings/Invoice'
import { getInvoices } from '@/functions/invoices/getInvoices'

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
