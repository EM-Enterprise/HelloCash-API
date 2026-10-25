import z from 'zod'

export const DateAndStringSchema = z.union([z.date(), z.iso.date()]).transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value))
