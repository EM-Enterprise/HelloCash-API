import httpRequest, { RequestProps } from '@/api/HttpRequest'
import { getAuthorization } from '@/config/authorization'

/**
 * @internal
 */
export default async function POST<T>(subRoute: string, body: RequestProps['body']) {
  let requestRoute = `https://api.hellocash.business/api/v1/${subRoute}`
  return httpRequest<T>({ authorizationToken: getAuthorization(), endpoint: requestRoute, body })
}
