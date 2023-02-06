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

const idempotency_key = uuidv4();

export const CreateTransfer = async (
  wallet_id,
  amount,
  destination,
  currency_symbol
) => {
  const { port, httpHost, portfolioId } = await fetchStore();

  let response;
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/wallets/${wallet_id}/transfers`;
  const body = {
    portfolio_id: portfolioId,
    wallet_id,
    amount,
    destination,
    idempotency_key,
    currency_symbol,
  };
  const payload = JSON.stringify(body);
  const path = `/v1/portfolios/${portfolioId}/wallets/${wallet_id}/transfers`;
  try {
    const initiateTransfer = await makeCall('POST', url, path, payload);
    response = await initiateTransfer.json();
    return response;
  } catch (e) {
    return e;
  }
};
