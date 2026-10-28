import GET from '@/fetch/GET'
import { z } from 'zod'
import { DateInputSchema } from '@/schemas/Shared/DateInputSchema'
import { InvoiceCollection, InvoiceCollectionSchema, validateInvoiceCollection } from '@/schemas/invoice/InvoiceCollection'

export const GetInvoicesParamsSchema = z.object({
  from: DateInputSchema.optional(),
  limit: z.number().int().min(1).max(250).default(25),
  offset: z.number().int().min(0).default(0),
  search: z.string().max(255).optional(),
  status: z.enum(['draft', 'completed', 'cancelled', 'all']).optional(),
  to: DateInputSchema.optional(),
})

export type GetInvoicesParams = z.input<typeof GetInvoicesParamsSchema>

/**
 * Retrieves a paginated collection of invoices.
 *
 * Only invoices belonging to the company's currently active
 * entry type (live, test, or demo) are returned.
 *
 * Supports filtering by date range, invoice status, and
 * invoice number or recipient name, as well as pagination.
 *
 * @param params - Optional filtering and pagination parameters.
 * @returns The validated invoice collection and pagination metadata.
 * @throws {z.ZodError} If the query parameters or API response are invalid.
 *
 * @see https://myhellocash.com/api/v2/invoices
 */
export async function getInvoices(params: GetInvoicesParams = {}): Promise<InvoiceCollection> {
  const query = GetInvoicesParamsSchema.parse(params)

  const response = await GET<z.input<typeof InvoiceCollectionSchema>>('invoices', query)

  return validateInvoiceCollection(response)
}
