export const get = async (endpoint: string): Promise<any> => {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
  });

  if (!response.ok) {
    const parsedError = await response.json();
    throw new Error(`${parsedError.detail} at uri ${parsedError.uri}`);
  }

  return await response.json();
}