import httpRequest from '@/fetch/HttpRequest'
import { getAuthorization } from '@/config/authorization'

export type QueryParamValue = string | number | boolean | null | undefined | readonly (string | number | boolean)[]
export type QueryParams = Record<string, QueryParamValue>

/**
 * Performs an authenticated GET request.
 *
 * Query parameters are automatically serialized and URL-encoded.
 * Parameters with null or undefined values are omitted.
 * Array values are serialized as repeated query parameters.
 *
 * @param subRoute - The API route relative to the base URL.
 * @param queryParams - Optional query parameters.
 * @internal
 * @returns The response data.
 */
export default async function GET<T>(subRoute: string, queryParams?: QueryParams): Promise<T> {
  const url = new URL(`https://myhellocash.com/api/v2/${subRoute}`)

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value === null || value === undefined) continue

      if (Array.isArray(value)) {
        for (const item of value) {
          url.searchParams.append(key, String(item))
        }
      } else {
        url.searchParams.set(key, String(value))
      }
    }
  }

  return httpRequest<T>({
    method: 'GET',
    authorizationToken: getAuthorization(),
    endpoint: url.toString(),
  })
}
