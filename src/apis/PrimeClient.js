import { getSignature } from './PrimeAuth';

export const makeCall = async (method, url, path, body) => {
  const signature = await getSignature(method, path, body);
  const headers = {
    Accept: 'application/json',
    'x-cb-access-key': signature.authResponse.access_key,
    'x-cb-access-signature': signature.authResponse.signature,
    'x-cb-access-timestamp': signature.authResponse.timestamp,
    'x-cb-access-passphrase': signature.authResponse.passphrase,
    'Content-Type': 'application/json',
  };
  try {
    if (body) {
      const callPrime = await fetch(url, {
        credentials: 'include',
        method,
        body,
        withCredentials: true,
        headers,
      });
      return callPrime;
    } else {
      const callPrime = await fetch(url, {
        credentials: 'include',
        method,
        withCredentials: true,
        headers,
      });

      return callPrime;
    }
  } catch (e) {
    return e;
  }
};
