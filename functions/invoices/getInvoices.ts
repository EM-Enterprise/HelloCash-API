import GET from '@/api/GET'
import { Invoice, RawInvoices } from '@/typings/Invoice'
import parseInvoice from '@/functions/invoices/parseInvoice'

export async function getInvoices(limit: number = -1) {
  const { invoices } = await GET<RawInvoices>('invoices', [`limit=${limit}`, 'showDetails=true'])

  return invoices.map((i): Invoice => parseInvoice(i))
}
