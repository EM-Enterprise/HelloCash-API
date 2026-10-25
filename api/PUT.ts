import httpRequest, { RequestProps } from '@/api/HttpRequest'
import { getAuthorization } from '@/config/authorization'

/**
 * Performs an authenticated PUT request to the API.
 *
 * Sends the provided request body to the specified endpoint
 * using the HTTP PUT method.
 *
 * @internal
 *
 * @template T - The expected response type.
 * @param subRoute - The API route relative to the base URL.
 * @param body - The request body to send.
 * @returns The response data.
 */
export default async function PUT<T>(subRoute: string, body: RequestProps['body']): Promise<T> {
  const requestRoute = `https://myhellocash.com/api/v2/${subRoute}`

  return httpRequest<T>({
    authorizationToken: getAuthorization(),
    endpoint: requestRoute,
    method: 'PUT',
    body,
  })
}
