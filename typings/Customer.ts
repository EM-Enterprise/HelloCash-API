export interface RawCustomers {
  users: Array<{
    user_id: string,
    user_timestamp: string | null,
    user_salutation: string | null,
    user_firstname: string | null,
    user_surname: string | null,
    user_email: string | null,
    user_phoneNumber: string | null,

    user_postalCode: string | null,
    user_city: string | null,
    user_street: string | null,
    user_houseNumber: string | null,
    user_country: string | null,

    user_uidNumber: string | null,
    user_company: string | null,
    user_birthday: string | null,
    user_notes: string | null

    user_custom_fields: any
  }>
}

export interface Customer {
  id: string,
  timestamp: Date | null,
  salutation: "Herr" | "Frau" | string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  phone: string | null,
  postCode: string | null,
  city: string | null,
  street: string | null,
  houseNumber: string | null,
  country: string | null,

  company: string | null,
  uid_number: string | null,

  birthday: string | null,
  notes: Array<string> | null
}