/**
 * Copyright 2022-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { fetchStore } from '../stores/userSession-store';
import { getStartDate } from '../utils/constants';
import { makeCall } from './PrimeClient';

const client_order_id = Math.random().toString();

const formatBody = (
  product_id,
  side,
  type,
  base_quantity,
  limit_price,
  time_in_force_text,
  start_time,
  expiry_time,
  display_base_size,
  portfolioId
) => {
  const body = {
    product_id,
    portfolio_id: portfolioId,
    side,
    client_order_id,
    type,
    base_quantity,
  };
  if (type === 'TWAP') {
    body.limit_price = limit_price;
    body.start_time = start_time;
    body.expiry_time = expiry_time;
  }
  if (type === 'LIMIT') {
    body.time_in_force = time_in_force_text;
    body.start_time = start_time;
    body.display_base_size = display_base_size;
  }

  return body;
};

export const createOrderPreview = async (
  product_id,
  side,
  type,
  base_quantity,
  limit_price,
  time_in_force_text,
  start_time,
  expiry_time,
  display_base_size
) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const path = `/v1/portfolios/${portfolioId}/order_preview`;
  const orderPreviewUrl = `${httpHost}:${port}/api${path}`;
  const preview_body = formatBody(
    product_id,
    side,
    type,
    base_quantity,
    limit_price,
    time_in_force_text,
    start_time,
    expiry_time,
    display_base_size,
    portfolioId
  );

  const payload = JSON.stringify(preview_body);

  try {
    const orderPreview = await makeCall('POST', orderPreviewUrl, path, payload);
    const orderPreviewResponse = await orderPreview.json();
    if (orderPreviewResponse) {
      return orderPreviewResponse;
    }
  } catch (e) {
    return e;
  }
};

export const createOrder = async (
  product_id,
  side,
  type,
  base_quantity,
  limit_price,
  time_in_force_text,
  start_time,
  expiry_time,
  display_base_size
) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const path = `/v1/portfolios/${portfolioId}/order`;
  const orderUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/order`;

  const body = formatBody(
    product_id,
    side,
    type,
    base_quantity,
    limit_price,
    time_in_force_text,
    start_time,
    expiry_time,
    display_base_size,
    portfolioId
  );

  const payload = JSON.stringify(body);
  try {
    const placeOrder = await makeCall('POST', orderUrl, path, payload);
    const orderResponse = await placeOrder.json();
    if (orderResponse) {
      return orderResponse;
    }
  } catch (e) {
    return e;
  }
};

export const getOrders = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const startDate = getStartDate(3);
  const path = `/v1/portfolios/${portfolioId}/orders`;
  const ordersUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/orders?${
    queryParams ? queryParams : `start_date=${startDate}`
  }`;

  try {
    const fetchOrders = await makeCall('GET', ordersUrl, path, '');
    const orderList = await fetchOrders.json();
    console.log(orderList);
    return orderList;
  } catch (e) {
    return e;
  }
};

export const getOrderId = async (orderId) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const path = `/v1/portfolios/${portfolioId}/orders/${orderId}`;
  const orderIdUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/orders/${orderId}`;

  try {
    const fetchOrderId = await makeCall('GET', orderIdUrl, path, '');
    const orderResponse = await fetchOrderId.json();
    return orderResponse;
  } catch (e) {
    return e;
  }
};

export const cancelOrder = async (orderId) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const body = {
    portfolio_id: portfolioId,
    order_id: orderId,
  };
  const payload = JSON.stringify(body);
  const cancelOrderUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/orders/${orderId}/cancel`;
  const path = `/v1/portfolios/${portfolioId}/orders/${orderId}/cancel`;
  try {
    const cancelOrderId = await makeCall('POST', cancelOrderUrl, path, payload);
    const orderResponse = await cancelOrderId.json();
    if (orderResponse) {
      return orderResponse;
    }
  } catch (e) {
    return e;
  }
};
