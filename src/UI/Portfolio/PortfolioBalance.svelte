<script>
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

  import { onMount } from 'svelte';

  import { getPortfolioBalance } from '../../apis/Balances';
  import Nav from '../../Nav.svelte';
  import _ from 'lodash-es';
  import BalancePieChart from '../BalancePieChart.svelte';
  import { OutboundLink } from 'carbon-components-svelte';

  let dollar;
  let results = [];
  let totalBalance;

  onMount(async () => {
    results = await getPortfolioBalance();
    _.each(results, (item) => (item.amount = parseInt(item.amount, 13)));

    totalBalance = _.sumBy(results, (item) => {
      return item.amount;
    });


    const formatMoney = (totalBalance) => {
      return totalBalance.toLocaleString('en-US');
    };

    dollar = await formatMoney(totalBalance);
  });
</script>

<Nav />

<div class="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
  <div class="mb-4 flex items-center justify-between">
    <div>
      <h3 class="mb-2 text-xl font-bold text-gray-900">
        Portfolio Balance: ${dollar}
      </h3>
      <span class="text-base font-normal text-gray-500"
        >This is a list of Portfolio balances
        <ul class="list-disc" style="padding-left: 1rem">
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfoliobalances"
            >
              https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfoliobalances</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolio_id/balances</li>
        </ul>
      </span>
    </div>
    <BalancePieChart />
  </div>
  <div class="mt-8 flex flex-col">
    <div class="overflow-x-auto rounded-lg">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Symbol
                </th>
                <th
                  scope="col"
                  class="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  class="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Holds
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              {#each results as r}
                <tr>
                  <td
                    class="whitespace-nowrap p-4 text-sm font-normal text-gray-900"
                  >
                    <span class="font-semibold">{r.id}</span>
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm font-normal text-gray-500"
                  >
                    {r.amount}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm font-semibold text-gray-900"
                  >
                    {r.holds}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
