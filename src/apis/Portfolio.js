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

export const getPortfolios = async () => {
  const { port, httpHost, portfolioId } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}`;

  const path = `/v1/portfolios/${portfolioId}`;
  try {
    const fetchPortfolios = await makeCall('GET', url, path, '');

    const portFoliosList = await fetchPortfolios.json();
    return portFoliosList.portfolio;
  } catch (e) {
    return e;
  }
};

export const getAllPortfolios = async () => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios`;

  const path = `/v1/portfolios`;
  try {
    const fetchPortfolios = await makeCall('GET', url, path, '');

    const portFoliosList = await fetchPortfolios.json();
    return portFoliosList.portfolios;
  } catch (e) {
    return e;
  }
};
