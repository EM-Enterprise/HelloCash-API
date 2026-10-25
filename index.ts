import { setAuthorization } from '@/config/authorization'

import * as invoiceFunctions from '@/api/invoices/_export'
import * as customerFunctions from '@/api/customers/_export'
import * as articleFunctions from '@/api/articles/_export'
import * as categoryFunctions from '@/api/categories/_export'

type InvoiceFunctionType = typeof invoiceFunctions
type CustomerFunctionType = typeof customerFunctions
type ArticleFunctionType = typeof articleFunctions
type CategoryFunctionType = typeof categoryFunctions

interface Hellocash extends InvoiceFunctionType, CustomerFunctionType, ArticleFunctionType, CategoryFunctionType {}

class Hellocash {
  constructor(authorizationToken: string) {
    setAuthorization(authorizationToken)

    Object.assign(this, invoiceFunctions)
    Object.assign(this, customerFunctions)
    Object.assign(this, articleFunctions)
    Object.assign(this, categoryFunctions)
  }
}

export = Hellocash
