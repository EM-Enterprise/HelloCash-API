import { z } from 'zod'

/**
 * @internal
 */
export const DateTimeSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value))
