import { z } from 'zod'

export const CustomerSchema = z.object({
  id: z.string(),
  timestamp: z.string().optional(),
  salutation: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  postCode: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  houseNumber: z.string().optional(),
  country: z.string().optional(),

  company: z.string().optional(),
  uid_number: z.string().optional(),

  birthday: z.string().optional(),
  notes: z.array(z.string()).optional(),
})

export const RawCustomerSchema = z.object({
  user_id: z.string(),
  user_timestamp: z.string().nullable(),
  user_salutation: z.string().nullable(),
  user_firstname: z.string().nullable(),
  user_surname: z.string().nullable(),
  user_email: z.string().nullable(),
  user_phoneNumber: z.string().nullable(),

  user_postalCode: z.string().nullable(),
  user_city: z.string().nullable(),
  user_street: z.string().nullable(),
  user_houseNumber: z.string().nullable(),
  user_country: z.string().nullable(),

  user_uidNumber: z.string().nullable(),
  user_company: z.string().nullable(),
  user_birthday: z.string().nullable(),
  user_notes: z.string().nullable(),

  user_custom_fields: z.any(),
})

export const RawCustomersSchema = z.object({
  users: z.array(RawCustomerSchema),
})

export type Customer = z.infer<typeof CustomerSchema>
export type RawCustomer = z.infer<typeof RawCustomerSchema>
export type RawCustomers = z.infer<typeof RawCustomersSchema>
