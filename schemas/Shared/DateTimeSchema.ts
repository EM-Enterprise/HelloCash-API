import { z } from 'zod'

export const DateTimeSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value))
