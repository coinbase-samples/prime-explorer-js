import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const createExchangeOrder = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/orders`;
  const path = `/orders`;

  const body = {
   type:"market",
    side:"buy",
    product_id:"MATIC-USD",
    time_in_force:"FOK",
    size:"0.1",
  };

  const payload = JSON.stringify(body);
  try {
    const createExchangeOrder = await makeCall('POST', url, path, payload);

    const orderResponse = await createExchangeOrder.json();

    return orderResponse;
  } catch (e) {
    return e;
  }
};

export const getOrderById = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/orders/9a5cd33b-e371-4ff0-a7f1-5804250e38cc`;
  const path = "/orders/9a5cd33b-e371-4ff0-a7f1-5804250e38cc";

  try {
    const fetchOrderById = await makeCall('GET', url, path, '');

    const orderDetails = await fetchOrderById.json();

    return orderDetails;
  } catch (e) {
    return e;
  }
};
