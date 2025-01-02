import { z } from 'zod'
import { getRandomNumberAsString } from '@/functions/utils/randomDefaultValues'
import { StripZodDefault } from '@/schemas/utils/stripZodDefaultValues'
import { useSchema } from '@/schemas/utils/useSchema'

/**
 * This schema defines the structure of a raw-invoice including default values
 * @internal
 */
export const RawInvoiceSchema = z.object({
  invoice_id: z.string().default(getRandomNumberAsString()),
  invoice_timestamp: z.string().default(new Date(Date.parse('2024/12/27')).toISOString()),
  invoice_number: z.string().default(getRandomNumberAsString()),
  invoice_cashier: z.string().default('John Doe'),
  invoice_cashier_id: z.string().default(getRandomNumberAsString()),
  invoice_mode: z.string().default('default'),
  invoice_payment: z.string().default('PayPal'),
  invoice_total: z.string().default(getRandomNumberAsString()),
  invoice_discount: z.string().optional(),
  invoice_totalNet: z.string().default(getRandomNumberAsString()),
  invoice_totalTax: z.string().default(getRandomNumberAsString()),
  invoice_text: z.string().optional(),
  invoice_currency: z.string().default('EUR'),
  invoice_cancellation: z.string().default('not cancelled'),
  company: z.object({
    name: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    postalCode: z.string(),
    city: z.string(),
    email: z.string().optional(),
    website: z.string().optional(),
    phoneNumber: z.string().optional(),
    companyRegister: z.string().optional(),
    iban: z.string().optional(),
    bic: z.string().optional(),
  }),

  items: z.array(
    z.object({
      item_id: z.string().default(getRandomNumberAsString()),
      item_quantity: z.string().optional().catch('0'),
      item_name: z.string().default(`Item-${getRandomNumberAsString()}`),
      item_price: z.string().optional().catch('0'),
      item_total: z.string().default(getRandomNumberAsString()),
      item_taxRate: z.string().optional().catch('0'),
      item_discount: z.string().default('0'),
      item_discount_unit: z.string().optional(),
      item_discount_value: z.string().default('0'),
      item_service_id: z.string().default(getRandomNumberAsString()),
      item_article_id: z.string().default(getRandomNumberAsString()),
    }),
  ),

  customer: z
    .object({
      customer_id: z.string(),
      customer_salutation: z.string(),
      customer_firstName: z.string(),
      customer_surName: z.string(),
      customer_postalCode: z.string(),
      customer_city: z.string(),
      customer_country: z.string(),
      customer_street: z.string(),
      customer_houseNumber: z.string(),
      customer_email: z.string(),
      customer_phoneNumber: z.string(),
      customer_uid: z.string(),
    })
    .optional(),

  taxes: z.array(
    z.object({
      tax_taxRate: z.string().default('13'),
      tax_gross: z.string().default('20'),
      tax_net: z.string().default('14'),
      tax_tax: z.string().default('6'),
    }),
  ),
})

export type RawInvoice = z.infer<StripZodDefault<typeof RawInvoiceSchema>>

const { validateObject: validateRawInvoice, getDummyObject: getDummyRawInvoice, safeParseObject: safeParseRawInvoice } = useSchema<RawInvoice>(RawInvoiceSchema)
export { validateRawInvoice, getDummyRawInvoice, safeParseRawInvoice }
