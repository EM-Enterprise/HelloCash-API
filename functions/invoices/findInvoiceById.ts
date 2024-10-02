import { Invoice, RawInvoices } from '@/typings/Invoice'
import GET from '@/api/GET'
import parseInvoice from '@/functions/invoices/parseInvoice'

export default async function findInvoiceById(invoice_id: Invoice['id']): Promise<Invoice | null> {
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
