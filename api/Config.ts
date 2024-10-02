let authorizationToken: string | undefined

export function getAuthorization(): never | string {
  if (!authorizationToken) throw new ReferenceError('Missing Authorization Token. Use setAuthorization() to set the authenticationToken.')
  return authorizationToken
}

export function setAuthorization(auth: string) {
  authorizationToken = auth;
}