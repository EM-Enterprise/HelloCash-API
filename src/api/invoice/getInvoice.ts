import GET from '@/api/GET'
import { InvoiceDetailResource, InvoiceDetailResourceSchema } from '@/schemas/invoice/InvoiceDetailResource'
import { z } from 'zod'

const GetInvoiceIdSchema = z.number().int().min(1)

const GetInvoiceResponseSchema = z.object({
  data: InvoiceDetailResourceSchema,
})

/**
 * Retrieves a specific invoice by its unique ID.
 *
 * Includes the invoice's positions, calculated totals,
 * tax breakdown, customer and company details, payment
 * methods, and other invoice metadata.
 *
 * @param id - The unique ID of the invoice to retrieve.
 * @returns The validated invoice with all available details.
 * @throws {z.ZodError} If the invoice ID or API response is invalid.
 *
 * @see https://myhellocash.com/api/v2/invoices/{id}
 */
export default async function getInvoice(id: number): Promise<InvoiceDetailResource> {
  const invoiceId = GetInvoiceIdSchema.parse(id)

  const response = await GET<z.input<typeof GetInvoiceResponseSchema>>(`invoices/${invoiceId}`)

  const { data } = GetInvoiceResponseSchema.parse(response)

  return data
}
