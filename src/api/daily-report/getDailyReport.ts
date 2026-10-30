import GET from '@/fetch/GET'
import { DailyReportDetailResourceSchema, DailyReportDetailResource } from '@/schemas/daily-report/DailyReportDetailResource'
import { createResourceResponseSchema } from '@/schemas/Shared/createResourceResponseSchema'
import { z } from 'zod'

const GetDailyReportNumberSchema = z.number().int()

const GetDailyReportResponseSchema = createResourceResponseSchema(DailyReportDetailResourceSchema)

/**
 * Retrieves a detailed daily closing report (Z-report)
 * by its sequential report number.
 *
 * The lookup is scoped to the cash register associated
 * with the authorization token. Report numbers are counted
 * separately for each cash register.
 *
 * If multiple reports share the same number due to a
 * number-sequence reset, the API returns the newest one.
 *
 * The report includes aggregated financial totals, VAT,
 * payment methods, employee turnover, cancellations,
 * sold positions, and optional fiscal information.
 *
 * Date-time strings are automatically transformed into
 * JavaScript Date objects during response validation.
 *
 * @param number - The sequential Z-report number.
 * @returns The validated detailed daily closing report.
 * @throws {z.ZodError} If the report number or API
 *         response is invalid.
 * @throws If the API request fails.
 *
 * @see https://myhellocash.com/api/v2/reports/daily-reports/{number}
 */
export async function getDailyReport(number: number): Promise<DailyReportDetailResource> {
  const reportNumber = GetDailyReportNumberSchema.parse(number)

  const response = await GET<z.input<typeof GetDailyReportResponseSchema>>(`reports/daily-reports/${reportNumber}`)

  const { data } = GetDailyReportResponseSchema.parse(response)

  return data
}
