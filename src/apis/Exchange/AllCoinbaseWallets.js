import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getWallets = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/coinbase-accounts`;
  const path = `/coinbase-accounts`;

  try {
    const fetchWallets = await makeCall('GET', url, path, '');

    const allWalletsList = await fetchWallets.json();

    return allWalletsList;
  } catch (e) {
    return e;
  }
};
