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

  import {
    Content,
    Button,
    DataTable,
    Link,
    OutboundLink,
  } from 'carbon-components-svelte';
  import { createForm } from 'svelte-forms-lib';
  import { getPortfolioWallets } from '../apis/Wallets';
  import { generateQueryparams } from '../utils/queryParams';

  let portfolioWallets;
  let loaded;
  let WalletsForm = false;
  let WalletsFilterView = false;
  let WalletsFilter;
  let queryParams;
  let stringifiedQueryParams;

  onMount(async () => {
    portfolioWallets = await getPortfolioWallets();
    loaded = true;
  });

 

  const submitForm = async (type, cursor, limit, sort_direction, symbols) => {
    queryParams = {
      type,
      cursor,
      limit,
      sort_direction,
      symbols,
    };

    const stringifiedQueryParams = generateQueryparams(queryParams);

      WalletsFilter = await getPortfolioWallets(stringifiedQueryParams);
      WalletsFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      type: 'VAULT',
      cursor: '',
      limit: '2',
      sort_direction: 'ASC',
      symbols: 'btc',
    },
    onSubmit: (values) => {
      const type = values.type;
      const cursor = values.cursor;
      const limit = values.limit;
      const sort_direction = values.sort_direction;
      const symbols = values.symbols;
      submitForm(type, cursor, limit, sort_direction, symbols);
    },
  });

  const closeForm = () => {
    WalletsForm = false;
    WalletsFilterView = false;
  };
</script>

{#if loaded}
  <Content class="Layout">
    {#if WalletsForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <label class="mb-2 block text-sm font-bold text-gray-700" for="type"
            ><b>Type: </b></label
          ><br />
          <select
            id="type"
            name="type"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.type}
          >
            <option />
            <option>VAULT</option>
            <option>TRADING</option>
          </select>
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="symbols"><b>Symbol: </b></label
          ><br />
          <input
            id="symbols"
            name="symbols"
            on:change={handleChange}
            bind:value={$form.symbols}
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          />
          {#if $form.type === 'VAULT'}
            <label
              class="mb-2 block text-sm font-bold text-gray-700"
              for="limit"><b>Limit: </b></label
            ><br />
            <input
              id="limit"
              name="limit"
              on:change={handleChange}
              bind:value={$form.limit}
              class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            />

            <label
              class="mb-2 block text-sm font-bold text-gray-700"
              for="sort_direction"
              >Sort Direction:
            </label>
            <select
              id="sort_direction"
              name="sort_direction"
              class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
              on:change={handleChange}
              bind:value={$form.sort_direction}
            >
              <option />
              <option>ASC</option>
              <option>DESC</option>
            </select>
            <label
              class="mb-2 block text-sm font-bold text-gray-700"
              for="cursor"
              >Cursor (for pagination (last consumed record):
            </label>
            <input
              id="cursor"
              name="cursor"
              class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
              on:change={handleChange}
              bind:value={$form.cursor}
            />
          {/if}
          <br /><br />

          <Button
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit">Submit</Button
          >
          <Button
            on:click={closeForm}
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <div>
        <Button
          on:click={() => (WalletsForm = true)}
          class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >Filter Wallets</Button
        >
      </div>
    {/if}
  </Content>

  {#if WalletsFilterView}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'name', value: 'Name' },
        { key: 'symbol', value: 'Symbol' },
        { key: 'type', value: 'Type' },
        { key: 'created_at', value: 'Created At' },
      ]}
      rows={WalletsFilter}
    >
      <strong slot="title">Filtered Wallets List</strong>
      <span slot="description" style="font-size: 1rem" />
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Wallets/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {:else}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'name', value: 'Name' },
        { key: 'symbol', value: 'Symbol' },
        { key: 'type', value: 'Type' },
        { key: 'created_at', value: 'Created At' },
      ]}
      rows={portfolioWallets}
    >
      <strong slot="title">Wallets List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>List all wallets associated with a given portfolio.</li>
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getwallets"
              >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getwallets</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolio_id/wallets</li>
        </ul>
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Wallets/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {/if}
{:else}
  <h3>Loading...</h3>
{/if}
