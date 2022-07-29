import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getPaymentMethods = async () => {
  const { port, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/exchange/payment-methods`;
  const path = `/payment-methods`;
  try {
    const fetchPaymentMethods = await makeCall('GET', url, path, '');

    const paymentsList = await fetchPaymentMethods.json();

    return paymentsList;
  } catch (e) {
    return e;
  }
};
