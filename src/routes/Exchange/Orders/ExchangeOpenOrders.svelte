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
  import { getOpenOrders } from '../../../apis/Exchange/Orders';
  import { assetsMenuList } from '../../../utils/constants';
  import Nav from '../../../Nav.svelte';
  import {
    Button,
    DataTable,
    Link,
    OutboundLink,
    Content,
  } from 'carbon-components-svelte';
  import { createForm } from 'svelte-forms-lib';
  import { generateQueryparams } from '../../../utils/queryParams';

  let orders;
  let ordersFilter;
  let ordersForm = false;
  let ordersFilterView = false;

  let loaded;

  const columnNames = [
    { key: 'id', value: 'Order Id' },
    { key: 'settled', value: 'Settled' },
    { key: 'type', value: 'Type' },
    { key: 'product_id', value: 'Product Id' },
    { key: 'side', value: 'Side' },
    { key: 'price', value: 'Price' },
    { key: 'created_at', value: 'Created At' },
    { key: 'size', value: 'Size' },
  ];

  onMount(async () => {
    orders = await getOpenOrders();
    loaded = true;
  });

  const submitForm = async (product_id, order_id) => {
    const queryParams = {
      product_id,
      order_id,
    };

    const stringifiedQueryParams = generateQueryparams(queryParams);

    ordersFilter = await getOpenOrders(stringifiedQueryParams);
    ordersFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      product_id: '',
      order_id: '',
    },
    onSubmit: (values) => {
      const order_id = values.order_id;
      const product_id = values.product_id;

      submitForm(product_id, order_id);
    },
  });

  const closeForm = () => {
    ordersForm = false;
    ordersFilterView = false;
  };
</script>

<Nav />
<Content>
  {#if loaded}
    {#if ordersForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="order_id"><b>Order ID: </b></label
          ><br />
          <input
            id="order_id"
            name="order_id"
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            on:change={handleChange}
            bind:value={$form.order_id}
          />

          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="product_id"><b>Product Ids: </b></label
          ><br />
          <select
            id="product_id"
            name="product_id"
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            on:change={handleChange}
            bind:value={$form.product_id}
          >
            {#each assetsMenuList as asset}
              <option>{asset}</option>
            {/each}
          </select>

          <br /><br />
          <Button
            class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit">Submit</Button
          >
          <Button
            on:click={closeForm}
            class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <br /><Button
        on:click={() => (ordersForm = true)}
        class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >Filter Orders</Button
      >
    {/if}

    {#if ordersFilterView}
      <DataTable size="short" headers={columnNames} rows={ordersFilter}>
        <strong slot="title">Filtered Orders List</strong>
        <span slot="description" style="font-size: 1rem">
          List historical orders for a given portfolio..
          /v1/portfolios/portfolio_id/orders
        </span>
        <span slot="cell" let:row let:cell>
          {#if cell.key === 'order_id' && cell.value}
            <Link href="/Exchange/Orders/{cell.value}">
              {cell.value}
            </Link>
          {:else}{cell.value}{/if}
        </span>
      </DataTable>
    {:else}
      <DataTable size="short" headers={columnNames} rows={orders}>
        <strong slot="title">Exchange Open Orders List</strong>
        <span slot="description" style="font-size: 1rem">
          <ul class="list-disc" style="padding-left: 1rem">
            <li>List Open Orders for a given Profile..</li>
            <li>
              API Docs: <OutboundLink
                href="https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getorders"
                >https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getorders</OutboundLink
              >
            </li>
            <li>Endpoint: /orders</li>
          </ul>
        </span>
        <span slot="cell" let:row let:cell>
          {#if cell.key === 'id' && cell.value}
            <Link href="/Exchange/Orders/{cell.value}">
              {cell.value}
            </Link>
          {:else}{cell.value}{/if}
        </span>
      </DataTable>
    {/if}
  {:else}
    <h3>Loading...</h3>
  {/if}
</Content>
