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

const allocation_id = uuidv4();
const allocation_leg_id = uuidv4();

export const createAllocation = async (order_ids, size_type) => {
  const { portfolioId, destinationPortfolio, httpHost, port } =
    await fetchStore();
  console.log(order_ids);

  const url = `${httpHost}:${port}/api/v1/allocations`;
  const path = `/v1/allocations`;
  const product_id = 'ETH-USD';

  const allocation_legs = [
    {
      allocation_leg_id,
      destination_portfolio_id: destinationPortfolio,
      amount: '0.2',
    },
  ];
  console.log(allocation_legs);
  const body = {
    allocation_id,
    source_portfolio_id: portfolioId,
    product_id,
    order_ids,
    allocation_legs,
    size_type,
  };

  console.log(body);

  const payload = JSON.stringify(body);

  try {
    const initiateAllocation = await makeCall('POST', url, path, payload);

    const response = await initiateAllocation.json();
    console.log(payload);

    return response;
  } catch (e) {
    return e;
  }
};
