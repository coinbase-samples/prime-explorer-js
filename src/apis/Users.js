/**
 * Copyright 2022 Coinbase Global, Inc.
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

export const getPortfolioUsers = async () => {
  const { port, httpHost, portfolioId } = await fetchStore();
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/users?limit=30&sort_direction=ASC`;

  const path = `/v1/portfolios/${portfolioId}/users`;
  try {
    const fetchUsers = await makeCall('GET', url, path, '');
    const userListResponse = await fetchUsers.json();

    return userListResponse.users;
  } catch (e) {
    return e;
  }
};
