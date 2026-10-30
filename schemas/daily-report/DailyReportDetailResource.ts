import { DateTimeSchema } from '@/schemas/Shared/DateTimeSchema'
import { useSchema } from '@/schemas/utils/useSchema'
import { z } from 'zod'

/**
 * Lowest and highest receipt numbers within the closing period.
 *
 * Receipt sequences are maintained per cash register, so the
 * values do not necessarily describe a continuous sequence.
 */
const DailyReportReceiptNumbersSchema = z.object({
  from: z.number().int().nullable(),
  to: z.number().int().nullable(),
})

/**
 * Aggregated financial totals for the closing period.
 *
 * Unlike the summary resource's gross_sales property,
 * these values are calculated across all cash registers
 * belonging to the company.
 */
const DailyReportTotalsSchema = z.object({
  gross: z.number(),
  sub_total_gross: z.number(),
  discount: z.number(),
  cancellations_gross: z.number(),
})

/**
 * Aggregated VAT amounts for a specific tax rate.
 */
const DailyReportVatSchema = z.object({
  rate: z.number(),
  gross: z.number(),
  net: z.number(),
  tax: z.number(),
})

/**
 * Turnover aggregated by payment method.
 */
const DailyReportPaymentSchema = z.object({
  name: z.string(),
  count: z.number().int(),
  sales: z.number(),
  tips: z.number(),
  sub_total_gross: z.number(),
  cancellations_gross: z.number(),
  discount: z.number(),
})

/**
 * Turnover aggregated by the employee recorded on receipts.
 */
const DailyReportEmployeeTurnoverSchema = z.object({
  name: z.string().nullable(),
  receipt_count: z.number().int(),
  sales: z.number(),
  tips: z.number(),
})

/**
 * Aggregated cancellation amounts within the closing period.
 */
const DailyReportCancellationSchema = z.object({
  number: z.number().int(),
  gross: z.number(),
  net: z.number(),
  tax: z.number(),
})

/**
 * Aggregated sold positions grouped by name, type,
 * VAT rate, discount, and price.
 */
const DailyReportPositionSchema = z.object({
  name: z.string(),
  type: z.string(),
  tax_rate: z.number(),
  quantity: z.number(),
  discount: z.number(),
  gross: z.number(),
  note: z.string(),
  foreign_company: z.string().nullable(),
})

/**
 * Turnover grouped by item category/type.
 *
 * The nested item structure is not expanded in the
 * supplied documentation, so its individual fields
 * cannot yet be validated.
 */
const DailyReportCategoriesSchema = z.object({
  items: z.array(z.record(z.string(), z.unknown())),
  discount: z.number(),
  total: z.number(),
})

/**
 * Cashbook summary for the cash register that created
 * the closing report.
 */
const DailyReportCashbookSchema = z.object({
  pay_in: z.number(),
  pay_out: z.number(),
  saldo_on_start: z.number(),
  saldo: z.number(),
  saldo_all: z.number(),
  neg_saldo: z.boolean(),
})

/**
 * NF525 fiscal signature for French companies.
 */
const DailyReportSignatureSchema = z.object({
  signature_string: z.string(),
  sequence_number: z.number().int(),
  version: z.string(),
})

/**
 * Employee who created the daily closing report.
 */
const DailyReportEmployeeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

/**
 * Represents a detailed daily closing report (Z-report).
 *
 * Contains aggregated financial information across the
 * company's cash registers, including totals, VAT,
 * payment methods, employees, cancellations, and positions.
 *
 * Also includes optional category, cashbook, and fiscal
 * signature information.
 *
 * Date-time strings are automatically transformed into
 * JavaScript Date objects during parsing.
 */
export const DailyReportDetailResourceSchema = z.object({
  id: z.number().int(),
  number: z.number().int(),

  closed_at: DateTimeSchema,
  from: DateTimeSchema.nullable(),
  to: DateTimeSchema,

  currency: z.string(),
  tax_benefit: z.string(),
  invoice_count: z.number().int(),

  receipt_numbers: DailyReportReceiptNumbersSchema,
  totals: DailyReportTotalsSchema,

  vat: z.array(DailyReportVatSchema),
  payments: z.array(DailyReportPaymentSchema),
  employees: z.array(DailyReportEmployeeTurnoverSchema),
  cancellations: z.array(DailyReportCancellationSchema),
  positions: z.array(DailyReportPositionSchema),

  categories: DailyReportCategoriesSchema.nullable(),
  cashbook: DailyReportCashbookSchema.nullable(),
  signature: DailyReportSignatureSchema.nullable(),
  employee: DailyReportEmployeeSchema.nullable(),
})

export type DailyReportDetailResource = z.infer<typeof DailyReportDetailResourceSchema>

export const { getDummyDailyReportDetailResource, safeParseDailyReportDetailResource, validateDailyReportDetailResource } = useSchema(DailyReportDetailResourceSchema, 'DailyReportDetailResource')
