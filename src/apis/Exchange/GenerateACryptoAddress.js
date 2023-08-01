import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const CreateCryptoAddress = async (account_id) => {
  const accountId = account_id.replace(/-USD/g, '');
  const { port, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/exchange/coinbase-accounts/${accountId}/addresses`;
  const path = `/coinbase-accounts/${accountId}/addresses`;

  const body = {
    accountId,
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
