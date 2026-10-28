import { setAuthorization } from '@/config/authorization'

import * as articleFunctions from '@/api/article/_export'
import * as categoryFunctions from '@/api/article-category/_export'
import * as customerFunctions from '@/api/customer/_export'
import * as dailyReportFunctions from '@/api/daily-report/_export'
import * as invoiceFunctions from '@/api/invoice/_export'
import * as invoiceParkingFunctions from '@/api/invoice-parking/_export'
import * as offerFunctions from '@/api/offer/_export'

type ArticleFunctionType = typeof articleFunctions
type CategoryFunctionType = typeof categoryFunctions
type CustomerFunctionType = typeof customerFunctions
type DailyReportFunctionType = typeof dailyReportFunctions
type InvoiceFunctionType = typeof invoiceFunctions
type InvoiceParkingFunctionType = typeof invoiceParkingFunctions
type OfferFunctionType = typeof offerFunctions

interface Hellocash extends InvoiceFunctionType, CustomerFunctionType, ArticleFunctionType, CategoryFunctionType, DailyReportFunctionType, InvoiceParkingFunctionType, OfferFunctionType {}

class Hellocash {
  constructor(authorizationToken: string) {
    setAuthorization(authorizationToken)

    Object.assign(this, articleFunctions)
    Object.assign(this, categoryFunctions)
    Object.assign(this, customerFunctions)
    Object.assign(this, dailyReportFunctions)
    Object.assign(this, invoiceFunctions)
    Object.assign(this, invoiceParkingFunctions)
    Object.assign(this, offerFunctions)
  }
}

export = Hellocash
