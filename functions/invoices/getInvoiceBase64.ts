import { Invoice } from '@/typings/Invoice'
import GET from '@/api/GET'

export default async function getInvoiceBase64(invoice_id: Invoice['_id']) {
  const { pdf_base64_encoded } = await GET<{ pdf_base64_encoded: string }>(`invoices/${invoice_id}/pdf`, ['locale=de_DE'])
  return pdf_base64_encoded
}
