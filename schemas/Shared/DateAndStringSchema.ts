import z from 'zod'

export const DateAndStringSchema = z.union([z.date(), z.iso.date()]).transform((value) => (value instanceof Date ? value.toLocaleDateString('de-DE') : value))
