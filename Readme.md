# Hellocash API V1.0.3

This package simplifies the use of the HelloCash API.

## getArticles(limit: number = -1)

Returns an array of articles based on the requested amount

## getInvoices(limit: number = -1)

Returns an array of invoices based on the requested amount

## getCustomers(limit: number = -1)

Returns an array of customers based on the requested amount

## getBuyHistory(articles: Array<Article['id']>)

Returns a map that maps invoices with the requested articles to the customer that they are linked to. So, in other words
this function maps the invoices that contain the requested articles to the customers that bought those articles.

## findCustomer(user: Partial<Customer>)

Returns an Array of customers that match or partial match the given customer.

## createUser(customer: Partial<Omit<Customer, 'timestamp' | 'id'>>)

Creates a new customer in the HelloCash system based on the given customer.

## getCategories()

Returns an array of article-categories, where each category has a name and id. An category can then be used to filter a
set of articles by their category.

## getStockChanges(article_id: Article['id'])

Returns an array of stock-changes that represents the history of a given article. Each Change has an id, article_id,
invioice_id, timestamp, change property. Some may have a description and delivery-note-number.

## getInvoiceBase64(invoice_id: Invoice['_id'])

Returns the base64 pdf-string for a given Invoice. Note, that the invoice-id is the system id (_id).

## findInvoiceById(invoice_id: Invoice['id'])

Returns an Invoice in case an invoice matches the given id, otherwise null is returned. Note, the invoice-id is not the
system-id but rather the id that is displayed to the user-