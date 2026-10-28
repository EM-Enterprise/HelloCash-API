import GET from '@/fetch/GET'
import { DailyReportCollection, DailyReportCollectionSchema } from '@/schemas/daily-report/DailyReportCollection'
import { DateInputSchema } from '@/schemas/Shared/DateInputSchema'
import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { PaginationParamsSchema } from '@/schemas/Shared/PaginationSchema'
import { z } from 'zod'

/**
 * Validates query parameters for retrieving daily closing reports.
 *
 * Date filters accept JavaScript Date objects or ISO date
 * strings and are automatically converted to YYYY-MM-DD.
 *
 * When date bounds are omitted, the API determines an
 * effective 30-day date range.
 *
 * Pagination defaults to 25 reports per page,
 * starting at offset 0.
 */
const GetDailyReportsParamsSchema = PaginationParamsSchema.safeExtend({
  from: DateInputSchema.optional(),
  to: DateInputSchema.optional(),
})

/**
 * Parameters accepted by getDailyReports().
 *
 * Date filters may be Date objects or ISO date strings.
 * All properties are optional.
 */
export type GetDailyReportsParams = z.infer<typeof GetDailyReportsParamsSchema>

/**
 * Retrieves a paginated collection of finalized daily
 * closing reports (Z-reports).
 *
 * Reports are returned newest first.
 *
 * Supports filtering by date range and pagination.
 * Date filters accept JavaScript Date objects or ISO date
 * strings, which are converted into YYYY-MM-DD strings.
 *
 * When one or both date bounds are omitted, the API
 * applies its documented default 30-day window.
 *
 * Each report contains its unique ID, sequential number,
 * closing timestamp, gross sales, and currency.
 *
 * The response also includes the effective date range
 * applied by the API.
 *
 * @param params - Optional date filters and pagination parameters.
 * @returns The validated collection of daily closing reports,
 *          including pagination and effective date range.
 * @throws {z.ZodError} If the query parameters or API
 *         response are invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/reports/daily-reports
 */
export async function getDailyReports(params: GetDailyReportsParams = {}): Promise<DailyReportCollection> {
  const query = GetDailyReportsParamsSchema.parse(params)

  const response = await GET<z.input<typeof DailyReportCollectionSchema>>('reports/daily-reports', query)

  return DailyReportCollectionSchema.parse(response)
}
