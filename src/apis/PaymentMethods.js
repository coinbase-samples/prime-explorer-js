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
import { makeCall } from './PrimeClient';

export const getPaymentMethods = async () => {
  const { port, entityId, httpHost } = await fetchStore();
  const paymentMethodId = '';

  const url = `${httpHost}:${port}/api/v1/entities/${entityId}/payment-methods/${paymentMethodId}`;

  const path = `/v1/entities/${entityId}/payment-methods/${paymentMethodId}`;
  try {
    const fetchpaymentMethods = await makeCall('GET', url, path, '');

    const paymentMethodsList = await fetchpaymentMethods.json();
    return paymentMethodsList;
  } catch (e) {
    return e;
  }
};

export const getActivityId = async (paymentMethodsId) => {
  const { portfolioId, port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/payment-methods/${paymentMethodsId}`;
  const path = `/v1/portfolios/${portfolioId}/payment-methods/${paymentMethodsId}`;
  try {
    const fetchPaymentMethodsById = await makeCall('GET', url, path, '');

    const paymentMethodIdResponse = await fetchPaymentMethodsById.json();
    return paymentMethodIdResponse;
  } catch (e) {
    return e;
  }
};
