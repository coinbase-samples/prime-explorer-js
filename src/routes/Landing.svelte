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
  import { Content } from 'carbon-components-svelte';
  import Nav from '../Nav.svelte';
  import WalletCredit from '../UI/Portfolio/PortfolioCredit.svelte';
  import PortfolioCommission from '../UI/Portfolio/PortfolioCommission.svelte';

  import { getPortfolios } from '../apis/Portfolio';
  import PortfolioBalance from '../UI/Portfolio/PortfolioBalance.svelte';
  import RecentOrders from '../UI/Orders/RecentOrders.svelte';

  let portfolioResponse;

  onMount(async () => {
    portfolioResponse = await getPortfolios();
  });
</script>

<Nav />
<Content class="Layout">
  {#if portfolioResponse}
    <main>
      <div class="px-4 pt-6">
        <div class="my-4 grid grid-cols-1 xl:gap-4 2xl:grid-cols-2">
          <div class="mb-4 h-full rounded-lg bg-white p-4 shadow sm:p-6">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-xl font-bold leading-none text-gray-900">
                Organization Info
              </h3>
            </div>
            <div class="flow-root">
              <ul class="divide-y divide-gray-200">
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="/baseline_library_books_black_24dp.png"
                        alt="portfolio image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Portfolio
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      {portfolioResponse.id}
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="/baseline_badge_black_24dp.png"
                        alt="name image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Portfolio Name
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      {portfolioResponse.name}
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="/baseline_business_black_24dp.png"
                        alt="Entity image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Entity Id
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      {portfolioResponse.entity_id}
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="/baseline_location_city_black_24dp.png"
                        alt="Org Id image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Organization Id
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      {portfolioResponse.organization_id}
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="baseline_credit_card_black_24dp.png"
                        alt="Credit image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Credit Amount:
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      <WalletCredit />
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="/baseline_toll_black_24dp.png"
                        alt="Commission image"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-lg font-medium text-gray-900">
                        Commission Amount:
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base font-semibold text-gray-900"
                    >
                      <PortfolioCommission />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">
                  Recent Orders
                </h3>
                <span class="text-base font-normal text-gray-500"
                  >This is a list of the last 3 Orders</span
                >
              </div>
              <div class="flex-shrink-0">
                <a
                  href="/Orders"
                  class="rounded-lg p-2 text-sm font-medium text-cyan-600 hover:bg-gray-100"
                  >View all</a
                >
              </div>
            </div>
            <div class="mt-8 flex flex-col">
              <div class="overflow-x-auto rounded-lg">
                <div class="inline-block min-w-full align-middle">
                  <RecentOrders />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <PortfolioBalance />
  {/if}
</Content>
