import GET from '@/api/GET'
import parseRawInvoice from '@/functions/invoices/parseRawInvoice'
import { RawInvoices } from '@/schemas/invoice/RawInvoices'
import { Invoice } from '@/schemas/invoice/Invoice'

export async function getInvoices(limit: number = 1000) {
  if (limit === 0) return []
  if (limit < 0) limit = 1000

  const { invoices } = await GET<RawInvoices>('invoices', [`limit=${limit}`, 'showDetails=true'])

  return invoices.map((i): Invoice => parseRawInvoice(i))
}
