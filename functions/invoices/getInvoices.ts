import GET from '@/api/GET'
import parseInvoice from '@/functions/invoices/parseInvoice'
import { Invoice, RawInvoices } from '@/schemas/Invoice'

export async function getInvoices(limit: number = 1000) {
  if (limit === 0) return []
  if (limit < 0) limit = 1000

  const { invoices } = await GET<RawInvoices>('invoices', [`limit=${limit}`, 'showDetails=true'])

  return invoices.map((i): Invoice => parseInvoice(i))
}
