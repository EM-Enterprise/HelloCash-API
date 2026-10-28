import { DailyReportResourceSchema } from '@/schemas/daily-report/DailyReportResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { DateSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Represents the effective date range applied when
 * retrieving daily closing reports.
 *
 * Both dates are required and represent calendar days
 * rather than specific timestamps.
 *
 * The API automatically determines the effective range
 * when one or both date bounds are omitted.
 *
 * ISO date strings are transformed into JavaScript Date
 * objects using the shared ApiDateSchema.
 */
const DailyReportRangeSchema = z.object({
  from: DateSchema,
  to: DateSchema,
})

type DailyReportRange = z.infer<typeof DailyReportRangeSchema>

/**
 * Represents a paginated collection of daily closing reports.
 *
 * Contains the closing reports, shared pagination metadata,
 * and the effective date range applied by the API.
 *
 * Closing timestamps and date-range values are automatically
 * transformed into JavaScript Date objects during parsing.
 */
export const DailyReportCollectionSchema = createCollectionSchema(DailyReportResourceSchema).safeExtend({
  range: DailyReportRangeSchema,
})

export type DailyReportCollection = z.infer<typeof DailyReportCollectionSchema>

export const { getDummyDailyReportCollection, safeParseDailyReportCollection, validateDailyReportCollection } = useSchema(DailyReportCollectionSchema, 'DailyReportCollection')
