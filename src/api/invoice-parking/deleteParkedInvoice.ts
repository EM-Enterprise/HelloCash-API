import POST from '@/fetch/POST'
import { z } from 'zod'

const DiscardParkedInvoiceSchema = z.object({
  employee_id: z.number().int().min(1),
  reason: z.string().min(1).max(255),
})

export type DiscardParkedInvoice = z.infer<typeof DiscardParkedInvoiceSchema>

const DeleteParkedInvoiceIdSchema = z.number().int()

/**
 * Discards an existing parked invoice.
 *
 * The parked invoice is not physically deleted. Instead,
 * it is closed and the discard operation is recorded in
 * the fiscal journal, including the gross, tax, and net
 * amounts of its open positions.
 *
 * Discarding a parked invoice is a fiscal operation and
 * should not be automatically retried after an ambiguous
 * network failure.
 *
 * @param id - The unique ID of the parked invoice to discard.
 * @param params - The employee responsible for the discard
 *                 and the reason for discarding the invoice.
 * @returns Resolves when the invoice has been discarded.
 *          The API returns HTTP 204 with no response body.
 * @throws {z.ZodError} If the invoice ID or request body
 *         is invalid.
 *
 * @see https://myhellocash.com/api/v2/parked-invoices/{id}/discard
 */
export default async function deleteParkedInvoice(id: number, params: DiscardParkedInvoice): Promise<void> {
  const invoiceId = DeleteParkedInvoiceIdSchema.parse(id)
  const body = DiscardParkedInvoiceSchema.parse(params)

  await POST<void>(`parked-invoices/${invoiceId}/discard`, body)
}
