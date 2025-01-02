import GET from '@/api/GET'
import { Invoice } from '@/schemas/invoice/Invoice'

export default async function getInvoiceBase64(invoice_id: Invoice['system_id']) {
  const { pdf_base64_encoded } = await GET<{ pdf_base64_encoded: string }>(`invoices/${invoice_id}/pdf`, ['locale=de_DE'])
  return pdf_base64_encoded
}
