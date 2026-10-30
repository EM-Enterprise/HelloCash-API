import { InvoiceResourceSchema } from '@/schemas/invoice/InvoiceResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoiceCollectionSchema = createCollectionSchema(InvoiceResourceSchema)

export type InvoiceCollection = z.infer<typeof InvoiceCollectionSchema>
export const { getDummyInvoiceCollection, safeParseInvoiceCollection, validateInvoiceCollection } = useSchema(InvoiceCollectionSchema, 'InvoiceCollection')
