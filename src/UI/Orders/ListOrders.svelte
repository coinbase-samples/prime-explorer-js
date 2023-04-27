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
  import { getOrders } from '../../apis/Orders';

  import Nav from '../../Nav.svelte';
  import {
    Button,
    DataTable,
    Link,
    OutboundLink,
    Pagination,
  } from 'carbon-components-svelte';
  import { createForm } from 'svelte-forms-lib';
    import { generateQueryparams } from '../../utils/queryParams';

  let orders;
  let ordersFilter;
  let ordersForm = false;
  let ordersFilterView = false;
  let totalOrderItems;
  let paginatedOrders;
  let next_cursor;
  let has_next = false;
  let loaded;

  onMount(async () => {
    orders = await getOrders();
    loaded = true;
    next_cursor = orders.pagination.next_cursor;
    has_next = orders.pagination.has_next;
    orders = orders.orders;
    totalOrderItems = Object.keys(orders).length;
    const pluckedItems = orders.slice(0, 10);

    orders = pluckedItems;
  });

  const nextPaginationSet = async () => {
    if (has_next)
      paginatedOrders = await getOrders(
        `start_date=2022-06-25T00:59:59Z&cursor=${next_cursor}`
      );
    ordersFilter = paginatedOrders.orders;
    ordersFilterView = true;
  };



  const submitForm = async (
    product_ids,
    order_statuses,
    order_type,
    cursor,
    limit,
    order_side,
    start_date,
    end_date
  ) => {
    const queryParams = {
      product_ids,
      order_statuses,
      order_type,
      cursor,
      limit,
      order_side,
      start_date,
      end_date,
    };

    const stringifiedQueryParams = generateQueryparams(queryParams);
    
    ordersFilter = await getOrders(stringifiedQueryParams);
    ordersFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      product_ids: 'BTC-USD',
      start_date: '2021-12-05T14:48:00Z',
      order_side: 'BUY'
    },
    onSubmit: (values) => {
      const order_statuses = values.order_statuses;
      const product_ids = values.product_ids;
      const order_type = values.order_type;
      const cursor = values.cursor;
      const limit = values.limit;
      const order_side = values.order_side;
      const start_date = values.start_date;
      const end_date = values.end_date;

      submitForm(
        product_ids,
        order_statuses,
        order_type,
        cursor,
        limit,
        order_side,
        start_date,
        end_date
      );
    },
  });

  const closeForm = () => {
    ordersForm = false;
    ordersFilterView = false;
  };
</script>

{#if loaded}
  {#if ordersForm}
    <div class="mb-4">
      <form
        on:submit={handleSubmit}
        class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="order_statuses"><b>Order Statuses: </b></label
        ><br />
        <select
          id="order_statuses"
          name="order_statuses"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.order_statuses}
        >
          <option />
          <option>OPEN</option>
          <option>FILLED</option>
          <option>CANCELLED</option>
          <option>EXPIRED</option>
          <option>FAILED</option>
        </select>
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="product_ids"><b>Product Ids: </b></label
        ><br />
        <select
          id="product_ids"
          name="product_ids"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.product_ids}
        >
          <option />
          <option>BTC-USD</option>
          <option>ETH-USD</option>
        </select>
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="order_type"><b>Order Type: </b></label
        ><br />
        <select
          id="order_type"
          name="order_type"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.order_type}
        >
          <option />
          <option>MARKET</option>
          <option>LIMIT</option>
          <option>TWAP</option>
        </select><br /><br />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="cursor"
          >Cursor:
        </label>
        <input
          id="cursor"
          name="cursor"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.cursor}
        /><br /><br />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
          >Results Limit:
        </label>
        <input
          id="limit"
          name="limit"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.limit}
        /><br /><br />
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="sort_direction"
          >Sort Direction:
        </label>
        <input
          id="sort_direction"
          name="sort_direction"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.sort_direction}
        /><br /><br />
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="order_side"
          >Order Side:
        </label>
        <input
          id="order_side"
          name="order_side"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.order_side}
        /><br /><br />
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="start_date"><b>Start Date: </b></label
        ><br />
        <input
          id="start_date"
          name="start_date"
          on:change={handleChange}
          bind:value={$form.start_date}
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        /><br /><br />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="end_date"
          >End Date:
        </label>
        <input
          id="end_date"
          name="end_date"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.end_date}
        />
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
    <br /><Button
      on:click={() => (ordersForm = true)}
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >Filter Orders</Button
    >
  {/if}
  <Nav />
  {#if ordersFilterView}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'status', value: 'Status' },
        { key: 'product_id', value: 'Product Id' },
        { key: 'side', value: 'side' },
        { key: 'type', value: 'Type' },
        { key: 'created_at', value: 'Created At' },
        { key: 'base_quantity', value: 'Base Quantity' },
      ]}
      rows={ordersFilter.orders}
    >
      <strong slot="title">Filtered Orders List</strong>
      <span slot="description" style="font-size: 1rem">
        List historical orders for a given portfolio..
        /v1/portfolios/portfolio_id/orders
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Orders/{cell.value}">
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
        { key: 'status', value: 'Status' },
        { key: 'product_id', value: 'Product Id' },
        { key: 'side', value: 'side' },
        { key: 'type', value: 'Type' },
        { key: 'created_at', value: 'Created At' },
        { key: 'base_quantity', value: 'Base Quantity' },
      ]}
      rows={orders}
    >
      <strong slot="title">Orders List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>List historical orders for a given portfolio..</li>
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getorders "
              >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getorders</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolio_id/orders</li>
        </ul>
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Orders/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {/if}
  <Pagination
    totalItems={totalOrderItems}
    pageSize={10}
    on:click:button--next={nextPaginationSet}
  />
{:else}
  <h3>Loading...</h3>
{/if}
