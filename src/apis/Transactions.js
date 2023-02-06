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
import { v4 as uuidv4 } from 'uuid';
import { fetchStore } from '../stores/userSession-store';
import { makeCall } from './PrimeClient';

export const getTransactions = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/transactions?${queryParams}`;
  const path = `/v1/portfolios/${portfolioId}/transactions`;

  try {
    const fetchTransactions = await makeCall('GET', url, path, '');

    const transactionsList = await fetchTransactions.json();
    return transactionsList.transactions;
  } catch (e) {
    return e;
  }
};

export const getTransactionId = async (transactionId) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/transactions/${transactionId}`;
  const path = `/v1/portfolios/${portfolioId}/transactions/${transactionId}`;

  try {
    const fetchTransactionId = await makeCall('GET', url, path, '');
    const transactionResponse = await fetchTransactionId.json();
    return transactionResponse.transaction;
  } catch (e) {
    return e;
  }
};

export const CreateConversion = async (
  wallet_id,
  amount,
  destination,
  source_symbol,
  destination_symbol
) => {
  const idempotency_key = uuidv4();
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${wallet_id}/conversion`;
  const path = `/v1/portfolios/${portfolioId}/wallets/${wallet_id}/conversion`;

  const body = {
    wallet_id,
    amount,
    destination,
    source_symbol,
    destination_symbol,
    idempotency_key,
  };
  const payload = JSON.stringify(body);

  try {
    const createWalletPost = await makeCall('POST', url, path, payload);

    const createConversionResponse = await createWalletPost.json();
    return createConversionResponse;
  } catch (e) {
    return e;
  }
};
