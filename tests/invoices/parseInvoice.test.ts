import { describe } from '@jest/globals'

describe('parseInvoices - ', () => {
  it.todo('check passing valid invoice object, implement Zod-Schemas to validate invoice objects inside of parseInvoice function')
})

// test('parseInvoices - check passing invalid invoice object', () => {
//   const invoice = {} as RawInvoices['invoices'][number]
//
//   // todo: Implemented Zod-Schemas to validate invoice objects inside of parseInvoice function
//
//   expect(parseInvoice(invoice)).rejects.toThrow(TypeError)
//   expect(parseInvoice(invoice)).rejects.toThrow('Passed invoice object has not the required properties.')
// })
