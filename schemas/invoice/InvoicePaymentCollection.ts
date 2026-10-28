import { InvoicePaymentResourceSchema } from '@/schemas/invoice/InvoicePaymentResource'
import { createCollectionSchema } from '@/schemas/Shared/createCollectionSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

export const InvoicePaymentCollectionSchema = createCollectionSchema(InvoicePaymentResourceSchema)

export type InvoicePaymentCollection = z.infer<typeof InvoicePaymentCollectionSchema>

export const { safeParseInvoicePaymentCollection, validateInvoicePaymentCollection, getDummyInvoicePaymentCollection } = useSchema(InvoicePaymentCollectionSchema, 'InvoicePaymentCollection')
