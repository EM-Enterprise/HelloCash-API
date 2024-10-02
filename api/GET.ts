import httpRequest from "./HttpRequest"
import { getAuthorization } from "./Config"

/**
 * @internal
 */
export default async function GET<T>(subRoute: string, queryParms?: string[]) {
  let requestRoute = `https://api.hellocash.business/api/v1/${subRoute}?${queryParms?.join("&")}`
  return httpRequest<T>({ authorizationToken: getAuthorization(), endpoint: requestRoute })
}