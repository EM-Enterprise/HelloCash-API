import PUT from '@/api/PUT'
import { ParkedInvoiceDetailResource, ParkedInvoiceDetailResourceSchema, ParkedInvoiceItemSchema } from '@/schemas/invoice-parking/ParkedInvoiceDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { ParkInvoiceSchema } from '@/src/api/invoice-parking/parkInvoice'
import { z } from 'zod'

export const UpdateParkedInvoiceSchema = ParkInvoiceSchema.pick({ name: true, items: true, discount_percent: true, reference: true })

export type UpdateParkedInvoice = z.infer<typeof UpdateParkedInvoiceSchema>

const UpdateParkedInvoiceIdSchema = z.number().int()

const UpdateParkedInvoiceResponseSchema = createResourceResponseSchema(ParkedInvoiceDetailResourceSchema)

/**
 * Updates an existing parked invoice.
 *
 * The provided items replace the entire existing position list.
 * Existing positions are cancelled and the supplied positions
 * are written anew; individual positions cannot be patched.
 *
 * Updating a parked invoice is a fiscal operation and may
 * trigger fiscal transactions in supported countries.
 *
 * Each position's tax_rate and optional take_away_tax must
 * correspond to an active company tax rate or the tax rate
 * of the referenced article or service.
 *
 * @param id - The unique ID of the parked invoice to update.
 * @param invoice - The replacement positions and optional
 *                  invoice properties.
 * @returns The updated parked invoice, including its positions,
 *          calculated totals, and metadata.
 * @throws {z.ZodError} If the request parameters, body,
 *         or API response are invalid.
 *
 * @see https://myhellocash.com/api/v2/parked-invoices/{id}
 */
export default async function updateParkedInvoice(id: number, invoice: UpdateParkedInvoice): Promise<ParkedInvoiceDetailResource> {
  const invoiceId = UpdateParkedInvoiceIdSchema.parse(id)
  const body = UpdateParkedInvoiceSchema.parse(invoice)

  const response = await PUT<z.input<typeof UpdateParkedInvoiceResponseSchema>>(`parked-invoices/${invoiceId}`, body)

  const { data } = UpdateParkedInvoiceResponseSchema.parse(response)

  return data
}
