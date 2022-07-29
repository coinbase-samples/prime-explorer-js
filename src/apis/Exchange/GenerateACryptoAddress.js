import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const CreateCryptoAddress = async (account_id) => {
  const { port, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/exchange/coinbase-accounts/${account_id}/addresses`;
  const path = `/coinbase-accounts/${account_id}/addresses`;

  const body = {
    account_id,
  };
  const payload = JSON.stringify(body);

  try {
    const generateAddress = await makeCall('POST', url, path, payload);

    const address = await generateAddress.json();

    return address;
  } catch (e) {
    return e;
  }
};
