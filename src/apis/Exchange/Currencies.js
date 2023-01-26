import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getCurrencies = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/currencies`;
  const path = '/currencies';

  try {
    const fetchCurrencies = await makeCall('GET', url, path, '');

    const currencyList = await fetchCurrencies.json();

    return currencyList;
  } catch (e) {
    return e;
  }
};

export const getCurrencyId = async (currencyId) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/currencies/${currencyId}`;
  const path = `/currencies/${currencyId}`;
  try {
    const fetchCurrencyId = await makeCall('GET', url, path, '');

    const currencyDetails = await fetchCurrencyId.json();

    return currencyDetails;
  } catch (e) {
    return e;
  }
};
