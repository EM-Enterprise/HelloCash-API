import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents a daily closing report (Z-report) returned by the API.
 *
 * Contains the report's unique identifier, sequential number,
 * closing timestamp, gross sales, and currency.
 *
 * The report ID is stable across cash registers, whereas
 * the sequential report number is counted per cash register.
 *
 * The closed_at property is automatically transformed from
 * an ISO date-time string into a JavaScript Date object.
 */
export const DailyReportResourceSchema = z.object({
  id: z.number().int(),
  number: z.number().int(),
  closed_at: DateTimeSchema,
  gross_sales: z.number().nullable(),
  currency: z.string(),
})

export type DailyReportResource = z.infer<typeof DailyReportResourceSchema>

export const { getDummyDailyReportResource, safeParseDailyReportResource, validateDailyReportResource } = useSchema(DailyReportResourceSchema, 'DailyReportResource')
