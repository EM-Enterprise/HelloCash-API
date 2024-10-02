/**
 * @internal
 */
export interface RequestProps {
  endpoint: string
  authorizationToken: string
  body?: object
}

/**
 * @internal
 */
export default async function httpRequest<T>({ endpoint, authorizationToken, body }: RequestProps): Promise<T | never> {
  const response = await fetch(endpoint, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorizationToken
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }

  const responseText = await response.text();
  if (responseText.trim().length === 0) {
    throw new Error('[Hellocash-API]: Response has not returned any data.');
  }

  const json = JSON.parse(responseText)

  if(json?.error) {
    throw new Error(`[Hellocash-API]: ${json.error}`)
  }

  return json
}