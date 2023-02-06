import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getAccounts = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/coinbase-accounts`;
  const path = '/coinbase-accounts';

  try {
    const fetchAccounts = await makeCall('GET', url, path, '');

    const accountList = await fetchAccounts.json();

    return accountList;
  } catch (e) {
    return e;
  }
};
