import { z } from 'zod'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import GET from '@/fetch/GET'
import { ParkedInvoiceCollection, ParkedInvoiceCollectionSchema, validateParkedInvoiceCollection } from '@/schemas/invoice-parking/ParkedInvoiceCollection'

export type GetParkedInvoicesParams = z.input<typeof PaginationParamsSchema>

/**
 * Retrieves a paginated collection of open parked invoices.
 *
 * Returns carts that were parked at the standard cash register.
 * Carts belonging to the gastro table plan are not included.
 *
 * Each parked invoice includes its gross total after the
 * invoice-wide discount, when available.
 *
 * @param params - Optional pagination parameters.
 * @returns The validated collection of parked invoices
 *          and pagination metadata.
 * @throws {z.ZodError} If the query parameters or API
 *         response are invalid.
 *
 * @see https://myhellocash.com/api/v2/parked-invoices
 */
export default async function getParkedInvoices(params: GetParkedInvoicesParams = {}): Promise<ParkedInvoiceCollection> {
  const query = PaginationParamsSchema.parse(params)

  const response = await GET<z.input<typeof ParkedInvoiceCollectionSchema>>('parked-invoices', query)

  return validateParkedInvoiceCollection(response)
}
