import z from 'zod'

/**
 * A schema that accepts either a `Date` object or an ISO-formatted date string (`YYYY-MM-DD`).
 *
 * When parsed, `Date` objects are converted to ISO-formatted date strings
 * using their local calendar date. Valid date strings are preserved unchanged.
 *
 * @remarks
 * The output is always a serialized date string in `YYYY-MM-DD` format,
 * without time or timezone information.
 *
 * @example
 * ```ts
 * DateInputSchema.parse(new Date(2024, 0, 15)); // "2024-01-15"
 * DateInputSchema.parse("2024-01-15");          // "2024-01-15"
 * ```
 */
export const DateInputSchema = z.union([z.date(), z.iso.date()]).transform((value) => (value instanceof Date ? value.toLocaleDateString('de-DE') : value))
