import POST from '@/api/POST'
import { ParkedInvoiceDetailResource, ParkedInvoiceDetailResourceSchema } from '@/schemas/invoice-parking/ParkedInvoiceDetailResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { z } from 'zod'

const ParkInvoiceItemSchema = z
  .object({
    name: z.string().min(1).max(100),
    quantity: z.number().max(9999999.999),
    price: z.number().min(0).max(99999999.999),
    tax_rate: z.number().min(0),

    discount_unit: z.enum(['percent', 'absolute']).nullable().optional(),

    discount_value: z.number().min(0).max(9999999.99).default(0),

    service_id: z.number().int().min(1).nullable().optional(),
    article_id: z.number().int().min(1).nullable().optional(),

    type: z.enum(['article', 'service']).nullable().optional(),

    note: z.string().max(255).nullable().optional(),
    employee_id: z.number().int().min(1).nullable().optional(),

    take_away_price: z.number().min(0).max(99999999.999).nullable().optional(),

    take_away_tax: z.number().min(0).nullable().optional(),
  })
  .refine((item) => item.discount_unit !== 'percent' || item.discount_value <= 100, {
    message: 'Percentage discount must not exceed 100.',
    path: ['discount_value'],
  })
  .refine((item) => item.discount_unit !== 'absolute' || item.discount_value <= item.price * item.quantity, {
    message: 'Absolute discount must not exceed the line total.',
    path: ['discount_value'],
  })

export type ParkInvoiceItem = z.infer<typeof ParkInvoiceItemSchema>

export const ParkInvoiceSchema = z.object({
  name: z.string().min(1).max(150),
  items: z.array(ParkInvoiceItemSchema).min(1).max(100),
  discount_percent: z.number().int().min(0).max(100).default(0),
  reference: z.boolean().default(false),
})

export type ParkInvoice = z.infer<typeof ParkInvoiceSchema>

const ParkInvoiceResponseSchema = z.object({
  data: ParkedInvoiceDetailResourceSchema,
})

/**
 * Parks an invoice at the standard cash register.
 *
 * Parking is a fiscal operation and may record a fiscal transaction.
 * Each request creates a new parked invoice, even if an identical
 * request has already succeeded.
 *
 * Each position's tax_rate and optional take_away_tax must be
 * an active company tax rate or the rate of its article or service.
 *
 * The API calculates gross totals and applies the invoice-wide
 * discount.
 *
 * @param invoice - The parked invoice's name, positions,
 *                  and optional settings.
 * @returns The validated parked invoice, including its positions,
 *          calculated totals, and metadata.
 * @throws {z.ZodError} If the request or response is invalid.
 *
 * @see https://myhellocash.com/api/v2/parked-invoices
 */
export default async function parkInvoice(invoice: ParkInvoice): Promise<ParkedInvoiceDetailResource> {
  const body = ParkInvoiceSchema.parse(invoice)

  const response = await POST<z.input<typeof ParkInvoiceResponseSchema>>('parked-invoices', body)

  const { data } = ParkInvoiceResponseSchema.parse(response)

  return data
}
