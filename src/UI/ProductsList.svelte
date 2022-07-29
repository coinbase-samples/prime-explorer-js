<script>
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

  import { Content, Button } from 'carbon-components-svelte';
  import { createForm } from 'svelte-forms-lib';

  import { onMount } from 'svelte';
  import Nav from '../Nav.svelte';
  import { DataTable } from 'carbon-components-svelte';
  import { getProducts } from '../apis/Products';
  import queryString from 'querystring';
  import _ from 'lodash-es';

  let loaded = false;
  let products;
  let ProductsFilter;
  let ProductsForm = false;
  let ProductsFilterView = false;
  let queryParams;

  onMount(async () => {
    products = await getProducts();
    loaded = true;
  });
  const submitForm = async (cursor, limit, sort_direction) => {
    queryParams = {
      cursor,
      limit,
      sort_direction,
    };

    const filteredQueryParams = _.omitBy(
      queryParams,
      (v) => _.isUndefined(v) || _.isNull(v) || v === ''
    );

    const stringifiedQueryParams = queryString.stringify(filteredQueryParams);
    ProductsFilter = await getProducts(stringifiedQueryParams);
    ProductsFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      limit: '50',
      sort_direction: 'ASC',
    },
    onSubmit: (values) => {
      const cursor = values.cursor;
      const limit = values.limit;
      const sort_direction = values.sort_direction;
      submitForm(cursor, limit, sort_direction);
    },
  });
</script>

<Content class="Layout">
  {#if ProductsForm}
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
        <label class="mb-2 block text-sm font-bold text-gray-700" for="cursor"
          >Cursor:
        </label>
        <input
          id="cursor"
          name="cursor"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.cursor}
        />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
          >Results Limit:
        </label><br />
        <input
          id="limit"
          name="limit"
          on:change={handleChange}
          bind:value={$form.limit}
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        />
        <br /><br />
        <Button
          class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="submit">Submit</Button
        >
        <Button
          on:click={() => (ProductsForm = false)}
          class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >Close</Button
        >
      </form>
    </div>
    <br />
  {:else}
    <Button
      on:click={() => (ProductsForm = true)}
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >Filter Transactions</Button
    >
  {/if}
</Content>
<Nav />

{#if loaded && ProductsFilterView}
  <DataTable
    size="short"
    headers={[
      { key: 'id', value: 'Id' },
      { key: 'base_increment', value: 'Base Increment' },
      { key: 'quote_increment', value: 'Quote Increment' },
      { key: 'permissions', value: 'Permissions' },
    ]}
    rows={ProductsFilter}
  >
    <strong slot="title">Filtered Portfolio Product List</strong>
    <span slot="description" style="font-size: 1rem">
      List tradable products for a given portfolio.
      /v1/portfolios/portfolio_id/products
    </span>
    <ul class="list-disc" style="padding-left: 1rem">
      <li>List tradable products for a given portfolio</li>
      <li>
        API Docs:
        https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioproducts
      </li>
      <li>Endpoint: /v1/portfolios/portfolio_id/products</li>
    </ul>
  </DataTable>
{:else}
  <DataTable
    size="short"
    headers={[
      { key: 'id', value: 'Id' },
      { key: 'base_increment', value: 'Base Increment' },
      { key: 'quote_increment', value: 'Quote Increment' },
      { key: 'permissions', value: 'Permissions' },
    ]}
    rows={products}
  >
    <span slot="description" style="font-size: 1rem">
      <ul class="list-disc" style="padding-left: 1rem">
        <li>List tradable products for a given portfolio</li>
        <li>
          API Docs:
          https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioproducts
        </li>
        <li>Endpoint: /v1/portfolios/portfolio_id/products</li>
      </ul>
    </span>
  </DataTable>
{/if}
