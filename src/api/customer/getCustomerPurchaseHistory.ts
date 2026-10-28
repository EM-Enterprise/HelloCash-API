import GET from '@/fetch/GET'
import { InvoiceCollection, InvoiceCollectionSchema } from '@/schemas/invoice/InvoiceCollection'
import { GetInvoicesParams, GetInvoicesParamsSchema } from '@/src/api/invoice/getInvoices'
import { z } from 'zod'

const GetCustomerPurchaseHistoryIdSchema = z.number().int()

/**
 * Retrieves the purchase history of a specific customer.
 *
 * Returns a paginated collection of invoices associated
 * with the customer, including invoice totals, payment
 * statuses, customer information, and creation timestamps.
 *
 * Supports filtering by date range, invoice status, and
 * invoice number or recipient name, as well as pagination.
 *
 * Date filters accept JavaScript Date objects or ISO date
 * strings and are automatically converted to YYYY-MM-DD.
 *
 * @param id - The unique ID of the customer.
 * @param params - Optional filtering, search, and pagination
 *                 parameters.
 * @returns The validated collection of customer invoices,
 *          including pagination metadata.
 * @throws {z.ZodError} If the customer ID, query parameters,
 *         or API response are invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/customers/{id}/invoices
 */
export async function getCustomerPurchaseHistory(id: z.infer<typeof GetCustomerPurchaseHistoryIdSchema>, params: GetInvoicesParams = {}): Promise<InvoiceCollection> {
  const customerId = GetCustomerPurchaseHistoryIdSchema.parse(id)
  const query = GetInvoicesParamsSchema.parse(params)

  const response = await GET<z.input<typeof InvoiceCollectionSchema>>(`customers/${customerId}/invoices`, query)

  return InvoiceCollectionSchema.parse(response)
}
