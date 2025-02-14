import { setAuthorization } from '@/config/authorization'

import * as invoiceFunctions from '@/functions/invoices/_export'
import * as customerFunctions from '@/functions/customers/_export'
import * as articleFunctions from '@/functions/articles/_export'
import * as categoryFunctions from '@/functions/categories/_export'

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
