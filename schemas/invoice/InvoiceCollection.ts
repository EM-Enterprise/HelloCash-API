import { InvoiceResourceSchema } from '@/schemas/invoice/InvoiceResource'
import { PaginationSchema } from '@/schemas/Shared/PaginationSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoiceCollectionSchema = z.object({
  data: z.array(InvoiceResourceSchema),
  pagination: PaginationSchema,
})

export type InvoiceCollection = z.infer<typeof InvoiceCollectionSchema>
export const { getDummyInvoiceCollection, safeParseInvoiceCollection, validateInvoiceCollection } = useSchema(InvoiceCollectionSchema, 'InvoiceCollection')
