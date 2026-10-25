import GET from '@/fetch/GET'
import { ParkedInvoiceDetailResourceSchema, ParkedInvoiceDetailResource } from '@/schemas/invoice-parking/ParkedInvoiceDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { z } from 'zod'

const GetParkedInvoiceIdSchema = z.number().int()

const GetParkedInvoiceResponseSchema = createResourceResponseSchema(ParkedInvoiceDetailResourceSchema)

/**
 * Retrieves a specific parked invoice by its unique ID.
 *
 * Includes all open positions, their quantities, prices,
 * tax rates, discounts, and calculated gross totals.
 *
 * The parked invoice also contains its invoice-wide discount,
 * reference flag, and last update timestamp.
 *
 * @param id - The unique ID of the parked invoice.
 * @returns The validated parked invoice with its positions.
 * @throws {z.ZodError} If the invoice ID or API response is invalid.
 *
 * @see https://myhellocash.com/api/v2/parked-invoices/{id}
 */
export default async function getParkedInvoice(id: number): Promise<ParkedInvoiceDetailResource> {
  const invoiceId = GetParkedInvoiceIdSchema.parse(id)

  const response = await GET<z.input<typeof GetParkedInvoiceResponseSchema>>(`parked-invoices/${invoiceId}`)

  const { data } = GetParkedInvoiceResponseSchema.parse(response)

  return data
}
