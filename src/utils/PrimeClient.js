import { getSignature } from '../apis/PrimeAuth';

export const makeCall = async (method, url, path, body) => {
  const signature = await getSignature(method, path, body);
  return fetch(url, {
    credentials: 'include',
    method,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'x-cb-access-key': signature.authResponse.access_key,
      'x-cb-access-signature': signature.authResponse.signature,
      'x-cb-access-timestamp': signature.authResponse.timestamp,
      'x-cb-access-passphrase': signature.authResponse.passphrase,
      'Content-Type': 'application/json',
    },
  });
};
