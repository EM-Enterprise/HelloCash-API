import { ParkedInvoiceResourceSchema } from '@/schemas/invoice-parking/ParkedInvoiceResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const ParkedInvoiceCollectionSchema = createCollectionSchema(ParkedInvoiceResourceSchema)

export type ParkedInvoiceCollection = z.infer<typeof ParkedInvoiceCollectionSchema>

export const { getDummyParkedInvoiceCollection, safeParseParkedInvoiceCollection, validateParkedInvoiceCollection } = useSchema(ParkedInvoiceCollectionSchema, 'ParkedInvoiceCollection')
