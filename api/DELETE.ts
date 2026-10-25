import httpRequest from '@/api/HttpRequest'
import { getAuthorization } from '@/config/authorization'

/**
 * Performs an authenticated DELETE request to the API.
 *
 * @internal
 *
 * @template T - The expected response type.
 * @param subRoute - The API route relative to the base URL.
 * @returns The response data, or void for endpoints returning
 *          HTTP 204 No Content.
 */
export default async function DELETE<T = void>(subRoute: string): Promise<T> {
  const requestRoute = `https://myhellocash.com/api/v2/${subRoute}`

  return httpRequest<T>({
    authorizationToken: getAuthorization(),
    endpoint: requestRoute,
    method: 'DELETE',
  })
}
