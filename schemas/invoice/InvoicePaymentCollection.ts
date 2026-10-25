import { InvoicePaymentResourceSchema } from '@/schemas/invoice/InvoicePaymentResource'
import { PaginationSchema } from '@/schemas/Shared/PaginationSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoicePaymentCollectionSchema = z.object({
  data: z.array(InvoicePaymentResourceSchema),
  pagination: PaginationSchema,
})

export type InvoicePaymentCollection = z.infer<typeof InvoicePaymentCollectionSchema>

export const { safeParseInvoicePaymentCollection, validateInvoicePaymentCollection, getDummyInvoicePaymentCollection } = useSchema(InvoicePaymentCollectionSchema, 'InvoicePaymentCollection')
