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
  import { createForm } from 'svelte-forms-lib';
  import { getAddressBook } from '../apis/AddressBook';
  import { Content, Button, OutboundLink } from 'carbon-components-svelte';
  import { DataTable, Link } from 'carbon-components-svelte';
  import CreateAddressForm from './CreateAddressForm.svelte';
  import { generateQueryparams } from '../utils/queryParams';

  let addresses;
  let addressesFilter;
  let addressesForm = false;
  let addressesFilterView = false;
  let createAddressForm = false;

  let loaded;

  let queryParams;

  onMount(async () => {
    addresses = await getAddressBook();
    loaded = true;
  });

  const submitForm = async (
    currency_symbol,
    search,
    cursor,
    limit,
    sort_direction
  ) => {
    queryParams = {
      currency_symbol,
      search,
      cursor,
      limit,
      sort_direction,
    };
    

    const stringifiedQueryParams = generateQueryparams(queryParams);

    addressesFilter = await getAddressBook(stringifiedQueryParams);
    addressesFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      currency_symbol: 'BTC',
      search: '',
      cursor: '',
      limit: '5',
      sort_direction: 'ASC',
    },
    onSubmit: (values) => {
      const currency_symbol = values.currency_symbol;
      const search = values.search;
      const cursor = values.cursor;
      const limit = values.limit;
      const sort_direction = values.sort_direction;
      submitForm(currency_symbol, search, cursor, limit, sort_direction);
    },
  });
</script>

{#if loaded}
  <Content class="Layout">
    {#if addressesForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="sort_direction"><b>Sort Direction: </b></label
          ><br />
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
            for="currency_symbol"
            >Currency Symbol:
          </label>
          <input
            id="currency_symbol"
            name="currency_symbol"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.currency_symbol}
          />

          <label class="mb-2 block text-sm font-bold text-gray-700" for="search"
            ><b>Search: </b></label
          ><br />
          <input
            id="search"
            name="search"
            on:change={handleChange}
            bind:value={$form.search}
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          />
          <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
            >Limit:
          </label>
          <br /><br />
          <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
            >Results Limit:
          </label>
          <input
            id="limit"
            name="limit"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.limit}
          />
          <br /><br />

          <br /><br />
          <Button
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit">Submit</Button
          >
          <Button
            on:click={() => (addressesForm = false)}
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <Button
        on:click={() => (addressesForm = true)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Filter Addresses</Button
      >
      <Button
        on:click={() => (createAddressForm = true)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Create Addresses</Button
      >
    {/if}
    {#if createAddressForm}
      <CreateAddressForm />
      <Button
        kind="danger"
        ls
        on:click={() => (createAddressForm = false)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Close</Button
      >
    {/if}
  </Content>

  {#if addressesFilterView}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'currency_symbol', value: 'Currency Symbol' },
        { key: 'explorer_link', value: 'Explorer Link' },
        { key: 'added_by.name', value: 'Added By' },
        { key: 'last_used_at', value: 'Last Used' },
      ]}
      rows={addressesFilter}
    >
      <strong slot="title">Filtered Addresses List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>
            Retrieve Addresses for a given portfolio (only Addresses that affect
            balances are accessible).
          </li>
          <li>
            API Docs: <OutboundLink
              >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioaddressbook</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolioId/address_book</li>
        </ul>
      </span>

      <span slot="cell" let:row let:cell>
        {#if cell.key === 'explorer_link' && cell.value}
          <Link href={cell.value}>
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
        { key: 'currency_symbol', value: 'Currency Symbol' },
        { key: 'explorer_link', value: 'Explorer Link' },
        { key: 'added_by.name', value: 'Added By' },
        { key: 'last_used_at', value: 'Last Used' },
      ]}
      rows={addresses}
    >
      <strong slot="title">Addresses List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>
            Retrieve Addresses for a given portfolio (only Addresses that affect
            balances are accessible).
          </li>
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioaddressbook"
              >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioaddressbook</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolioId/address_book</li>
        </ul>
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'explorer_link' && cell.value}
          <Link href={cell.value}>
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {/if}
{:else}
  <h3>Loading...</h3>
{/if}
