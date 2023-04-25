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
import _ from 'lodash-es';

let allocations;
let result;

export const getAllocationId = async (allocationId) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/allocations/${allocationId}`;
  const path = `/v1/portfolios/${portfolioId}/allocations/${allocationId}`;

  try {
    const fetchAllocationId = await makeCall('GET', url, path, '');
    const allocationResponse = await fetchAllocationId.json();
    return allocationResponse.allocation;
  } catch (e) {
    return e;
  }
};

export const getAllocations = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const path = `/v1/portfolios/${portfolioId}/allocations`;
  const allocationsUrl = `${httpHost}:${port}/api${path}?${
    queryParams ? queryParams : 'start_date=2023-04-05T00:00:01Z'
  }`;

  try {
    const fetchAllocations = await makeCall('GET', allocationsUrl, path, '');

    const allocationsResponse = await fetchAllocations.json();

    allocations = allocationsResponse.allocations;
    const keys = {
      root_id: 'id',
    };

    result = await allocations.map(function (o) {
      return _.mapKeys(o, function (v, k) {
        return k in keys ? keys[k] : k;
      });
    });

    return result;
  } catch (e) {
    return e;
  }
};
