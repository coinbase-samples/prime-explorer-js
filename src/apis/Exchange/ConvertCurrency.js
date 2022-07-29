import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const ConvertCurrency = async (profile_id, from, to, amount) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/conversions`;
  const path = `/conversions`;

  const body = {
    profile_id,
    from,
    to,
    amount,
  };

  const payload = JSON.stringify(body);
  try {
    const convertCurrency = await makeCall('GET', url, path, payload);

    const conversionResponse = await convertCurrency.json();

    return conversionResponse;
  } catch (e) {
    return e;
  }
};

export const getConversionId = async (conversionId) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/currencies/${conversionId}`;
  const path = `/conversions/${conversionId}`;

  try {
    const fetchConversionId = await makeCall('GET', url, path, '');

    const conversionDetails = await fetchConversionId.json();

    return conversionDetails;
  } catch (e) {
    return e;
  }
};
