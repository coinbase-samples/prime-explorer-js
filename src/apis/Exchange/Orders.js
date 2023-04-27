import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

function renameKey(arr) {
  return arr.map((obj) => {
    obj.id = obj.order_id;
    delete obj.order_id;
    return obj;
  });
}

export const createExchangeOrder = async (
  product_id,
  side,
  type,
  base_quantity,
  time_in_force_text
) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/orders`;
  const path = `/orders`;

  const body = {
    type,
    side,
    product_id,
    time_in_force_text,
    size: base_quantity,
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

export const getOrderById = async (orderId) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/orders/${orderId}`;
  const path = `/orders/${orderId}`;

  try {
    const fetchOrderById = await makeCall('GET', url, path, '');

    const orderDetails = await fetchOrderById.json();

    //const finalResponse = renameKey(orderDetails);

    return orderDetails;
  } catch (e) {
    return e;
  }
};

export const getOrderFills = async (queryParams) => {
  const { port, httpHost } = await fetchStore();
  const ordersUrl = `${httpHost}:${port}/api/exchange/fills?${
    queryParams ? queryParams : 'product_id=MATIC-USD'
  }`;

  const path = `/fills?${queryParams ? queryParams : 'product_id=MATIC-USD'}`;

  try {
    const fetchOrders = await makeCall('GET', ordersUrl, path, '');

    const ordersResponse = await fetchOrders.json();

    const finalResponse = renameKey(ordersResponse);

    return finalResponse;
  } catch (e) {
    return e;
  }
};
