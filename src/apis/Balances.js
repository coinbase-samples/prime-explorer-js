/**
 * Copyright 2023 Coinbase Global, Inc.
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
import _ from 'lodash-es';
import { fetchStore } from '../stores/userSession-store';
import { makeCall } from './PrimeClient';

let portfolioBalance;
let portfolioHotBalance;
let balances;
let result;
const keys = { symbol: 'id' };

export const getHotBalance = async () => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/balances?balance_type=TRADING_BALANCES`;

  const path = `/v1/portfolios/${portfolioId}/balances`;
  try {
    const fetchPortfolioHotBalance = await makeCall('GET', url, path, '');
    portfolioHotBalance = await fetchPortfolioHotBalance.json();

    return portfolioHotBalance;
  } catch (e) {
    return e;
  }
};

export const getPortfolioBalance = async () => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/balances?balance_type=TRADING_BALANCES`;

  const path = `/v1/portfolios/${portfolioId}/balances`;
  try {
    const fetchPortfolioBalance = await makeCall('GET', url, path, '');
    portfolioBalance = await fetchPortfolioBalance.json();
    balances = portfolioBalance.balances;

    result = await balances.map(function (o) {
      return _.mapKeys(o, function (v, k) {
        return k in keys ? keys[k] : k;
      });
    });

    const finalResponse = _.orderBy(result, ['amount']);

    return finalResponse;
  } catch (e) {
    return e;
  }
};
