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
import { v4 as uuidv4 } from 'uuid';

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

  const stakingPath = `/v1/portfolios/${portfolioId}/wallets/${walletId}/actions/ACTION_TYPE_UNSPECIFIED/inputs`;
  const stakignUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${walletId}/actions/ACTION_TYPE_UNSPECIFIED/inputs`;

  try {
    const fetchWalletId = await makeCall('GET', url, path, '');
    const stakingCall = await makeCall('GET', stakignUrl, stakingPath, '');
    //console.log('this is the unstaking call, ', unstake());
    const stakingResponse = await stakingCall.json();
    console.log('this is the staking response, ', stakingResponse);
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

export const initiateStake = async () => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/6b8140db-97cc-45d4-8d9f-40924dccc492/staking/initiate`;
  const path = `/v1/portfolios/${portfolioId}/wallets/6b8140db-97cc-45d4-8d9f-40924dccc492/staking/initiate`;
  //cosmos validator address: cosmosvaloper1c4k24jzduc365kywrsvf5ujz4ya6mwympnc4en
  //cosmos wallet id: 9035fa46-13ab-4751-8680-df6fe624d0b4
  //matic wallet id: 6b8140db-97cc-45d4-8d9f-40924dccc492
  //matic validator address: 0x857679d69fE50E7B722f94aCd2629d80C355163d
  const body = {
    idempotencyKey: uuidv4(),
    inputs: {
      validator_address: '0x857679d69fE50E7B722f94aCd2629d80C355163d',
    },
  };
  const payload = JSON.stringify(body);
  try {
    const executeInitiateStake = await makeCall('POST', url, path, payload);

    const executeInitiateStakeResponse = await executeInitiateStake.json();
    return executeInitiateStakeResponse;
  } catch (e) {
    return e;
  }
};

export const unstake = async () => {
  //cosmos unstake address:  c84b655f-1ed2-44d5-b670-4a0939dcc4ab
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/c84b655f-1ed2-44d5-b670-4a0939dcc4ab/staking/unstake`;
  const path = `/v1/portfolios/${portfolioId}/wallets/c84b655f-1ed2-44d5-b670-4a0939dcc4ab/staking/unstake`;
  const body = {
    idempotencyKey: uuidv4(),
  };
  const payload = JSON.stringify(body);
  try {
    const executeUnstake = await makeCall('POST', url, path, payload);

    const unstakeResponse = await executeUnstake.json();
    return unstakeResponse;
  } catch (e) {
    return e;
  }
};

export const restake = async () => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/cfde9bf4-1050-4b4f-b32d-31856472d7e0/staking/restake`;
  const path = `/v1/portfolios/${portfolioId}/wallets/cfde9bf4-1050-4b4f-b32d-31856472d7e0/staking/restake`;
  const body = {
    idempotencyKey: uuidv4(),
  };
  const payload = JSON.stringify(body);
  try {
    const executeRestake = await makeCall('POST', url, path, payload);

    const restakeResponse = await executeRestake.json();
    return restakeResponse;
  } catch (e) {
    return e;
  }
};
