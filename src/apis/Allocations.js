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
import { getStartDate } from '../utils/constants';
import { makeCall } from './PrimeClient';

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
  const startDate = getStartDate(30);
  const { port, portfolioId, httpHost } = await fetchStore();
  const path = `/v1/portfolios/${portfolioId}/allocations`;
  const allocationsUrl = `${httpHost}:${port}/api${path}?${
    queryParams ? queryParams : `start_date=${startDate}`
  }`;

  try {
    const fetchAllocations = await makeCall('GET', allocationsUrl, path, '');
    const allocationsResponse = await fetchAllocations.json();

    allocations = allocationsResponse.allocations;
    const keys = {
      root_id: 'id',
    };

    result = await Promise.all(
      allocations.map(function (o) {
        const mappedObj = {};
        for (const [key, value] of Object.entries(o)) {
          mappedObj[keys[key] || key] = value;
        }
        return mappedObj;
      })
    );

    return result;
  } catch (e) {
    return e;
  }
};

const createAllocationLegs = async (portfolios) => {
  const allocationLegs = [];
  const numPortfolios = portfolios.length;

  for (let i = 0; i < numPortfolios; i++) {
    const allocation_leg_id = uuidv4();
    const destination_portfolio_id = portfolios[i];
    const amount = 100 / portfolios.length;
    allocationLegs.push({
      allocation_leg_id,
      destination_portfolio_id,
      amount: JSON.stringify(amount),
    });
  }
  return allocationLegs;
};

export const createAllocation = async (
  product_ids,
  order_ids,
  size_type,
  portfolios
) => {
  const { port, httpHost, portfolioId } = await fetchStore();
  const allocation_id = uuidv4();

  const allocation_legs = await createAllocationLegs(portfolios);

  const body = {
    allocation_id,
    source_portfolio_id: portfolioId,
    product_id: product_ids,
    order_ids,
    allocation_legs,
    size_type,
  };

  const payload = JSON.stringify(body);

  try {
    const url = `${httpHost}:${port}/api/v1/allocations`;
    const path = `/v1/allocations`;
    const initiateAllocation = await makeCall('POST', url, path, payload);

    const response = await initiateAllocation.json();

    return response;
  } catch (e) {
    return e;
  }
};
