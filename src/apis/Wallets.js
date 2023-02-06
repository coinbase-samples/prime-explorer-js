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

export const getPortfolioWallets = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets?${
    queryParams ? queryParams : 'type=VAULT&limit=25&symbols=eth'
  }`;

  const path = `/v1/portfolios/${portfolioId}/wallets`;

  try {
    const fetchWallets = await makeCall('GET', url, path, '');

    const walletsList = await fetchWallets.json();
    return walletsList.wallets;
  } catch (e) {
    return e;
  }
};

export const getWalletId = async (walletId) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${walletId}`;
  const path = `/v1/portfolios/${portfolioId}/wallets/${walletId}`;
  try {
    const fetchWalletId = await makeCall('GET', url, path, '');

    const walletResponse = await fetchWalletId.json();

    return walletResponse.wallet;
  } catch (e) {
    return e;
  }
};

export const getWalletDepositDetails = async (walletId, type) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${walletId}/deposit_instructions?deposit_type=${type}`;
  const path = `/v1/portfolios/${portfolioId}/wallets/${walletId}/deposit_instructions`;

  try {
    const fetchWalletDepositDetails = await makeCall('GET', url, path, '');

    const walletDepositResponse = await fetchWalletDepositDetails.json();

    return walletDepositResponse;
  } catch (e) {
    return e;
  }
};

export const getWalletBalance = async (walletId) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${walletId}/balance`;
  const path = `/v1/portfolios/${portfolioId}/wallets/${walletId}/balance`;
  try {
    const fetchWalletBalance = await makeCall('GET', url, path, '');

    const walletBalance = await fetchWalletBalance.json();

    return walletBalance;
  } catch (e) {
    return e;
  }
};

export const CreateWallet = async (name, symbol, wallet_type) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets`;
  const path = `/v1/portfolios/${portfolioId}/wallets`;
  const body = {
    name,
    symbol,
    wallet_type,
  };
  const payload = JSON.stringify(body);
  try {
    const createWalletPost = await makeCall('POST', url, path, payload);

    const createWalletResponse = await createWalletPost.json();
    return createWalletResponse;
  } catch (e) {
    return e;
  }
};

export const getWalletTransactions = async (walletId, queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${walletId}/transactions?${queryParams}`;
  const path = `/v1/portfolios/${portfolioId}/wallets/${walletId}/transactions`;

  try {
    const fetchWalletTransactions = await makeCall('GET', url, path, '');

    const walletTransactionsResponse = await fetchWalletTransactions.json();

    return walletTransactionsResponse.transactions;
  } catch (e) {
    return e;
  }
};
