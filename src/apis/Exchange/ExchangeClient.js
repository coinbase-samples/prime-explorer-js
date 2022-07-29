import { getSignature } from './ExchangeAuth';

export const makeCall = async (method, url, path, body) => {
  const signature = await getSignature(method, path, body);
  const headers = {
    Accept: 'application/json',
    'CB-ACCESS-SIGN': signature.authResponse.signature,
    'CB-ACCESS-TIMESTAMP': signature.authResponse.timestamp,
    'CB-ACCESS-KEY': signature.authResponse.access_key,
    'CB-ACCESS-PASSPHRASE': signature.authResponse.passphrase,
    'Content-Type': 'application/json',
  };
  try {
    if (body) {
      const callExchange = await fetch(url, {
        credentials: 'include',
        method,
        body,
        withCredentials: true,
        headers,
      });
      return callExchange;
    } else {
      const callExchange = await fetch(url, {
        credentials: 'include',
        method,
        withCredentials: true,
        headers,
      });
      return callExchange;
    }
  } catch (e) {
    return e;
  }
};
