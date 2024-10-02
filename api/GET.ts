import httpRequest from '@/api/HttpRequest'
import { getAuthorization } from '@/config/authorization'

/**
 * @internal
 */
export default async function GET<T>(subRoute: string, queryParms?: string[]) {
  let requestRoute = `https://api.hellocash.business/api/v1/${subRoute}?${queryParms?.join('&')}`
  return httpRequest<T>({ authorizationToken: getAuthorization(), endpoint: requestRoute })
}
