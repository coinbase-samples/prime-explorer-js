import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getTransfers = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/transfers`;
  const path = '/transfers';
  try {
    const fetchTransfers = await makeCall('GET', url, path, '');

    const transferList = await fetchTransfers.json();

    return transferList;
  } catch (e) {
    return e;
  }
};

export const getTransferId = async (transferId) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/transfers/${transferId}`;
  const path = `/transfers/${transferId}`;
  try {
    const fetchTransferId = await makeCall('GET', url, path, '');

    const transferDetails = await fetchTransferId.json();
    console.log(transferDetails)
    return transferDetails;
  } catch (e) {
    return e;
  }
};
