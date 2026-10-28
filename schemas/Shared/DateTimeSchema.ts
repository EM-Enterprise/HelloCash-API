import { z } from 'zod'

/**
 * Parses an ISO 8601 date string (`YYYY-MM-DD`) into a JavaScript `Date` object.
 *
 * @remarks
 * Date-only values are interpreted as midnight in the local timezone,
 * preserving their calendar date.
 *
 * @example
 * DateSchema.parse("2024-01-15");
 * // Date representing January 15, 2024 at local midnight
 */
export const DateSchema = z.iso.date().transform((value) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
})

/**
 * Parses an ISO 8601 datetime string with a timezone offset
 * into a JavaScript `Date` object.
 *
 * @remarks
 * The resulting `Date` represents the same instant in time as the input.
 * The original timezone offset is not preserved.
 *
 * @example
 * DateTimeSchema.parse("2024-01-15T12:30:00+01:00");
 * // Date representing 2024-01-15T11:30:00.000Z
 */
export const DateTimeSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value))
