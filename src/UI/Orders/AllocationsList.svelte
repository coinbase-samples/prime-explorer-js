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
    import { getAllocations } from '../../apis/Allocations';
      import {
      Button,
      Link,
      DataTable,
      OutboundLink,
    } from 'carbon-components-svelte';
    import queryString from 'querystring';
    import { createForm } from 'svelte-forms-lib';
    import _ from 'lodash-es';
    import { getDate } from '../../utils/constants'

    let allocations;
    let allocationsForm = false;
    let allocationsFilterView = false;
    let FilteredAllocations;
    let queryParams;
    let loaded;
    const startDate= getDate(new Date(), -3);

  
    onMount(async () => {
      allocations = await getAllocations();
      loaded = true;

    });
    const submitForm = async (
      product_ids,
      order_type,
      cursor,
      limit,
      order_side,
      start_date,
      end_date
    ) => {
      queryParams = {
        product_ids,
        order_type,
        cursor,
        limit,
        order_side,
        start_date,
        end_date,
      };
  
      const filteredQueryParams = _.omitBy(
        queryParams,
        (v) => _.isUndefined(v) || _.isNull(v) || v === ''
      );
  
      const stringifiedQueryParams = queryString.stringify(filteredQueryParams);
       FilteredAllocations = await getAllocations(stringifiedQueryParams);
        allocationsFilterView = true;      
    };
  
    const { form, handleChange, handleSubmit } = createForm({
      initialValues: {
        product_ids: 'BTC-USD',
        start_date: startDate,
      },
      onSubmit: (values) => {
        const { product_ids, order_type, cursor, limit, order_side, start_date, end_date } = values;
        
  
        submitForm(
          product_ids,
          order_type,
          cursor,
          limit,
          order_side,
          start_date,
          end_date
        );
      },
    });
  
  </script>

  {#if loaded}
    {#if allocationsForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
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
            <option>SOL-USD</option>
            <option>MATIC-USD</option>
            <option>DOGE-USD</option>
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
            on:click={()=> (allocationsForm = false)}
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <br /><Button
        on:click={() => (allocationsForm = true)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Filter Allocations</Button
      >
    {/if}
    {#if allocationsFilterView}
      <DataTable
        size="short"
        headers={[
          { key: 'id', value: 'Root Id' },
          { key: 'product_id', value: 'Product Id' },
          { key: 'status', value: 'Status'},
          { key: 'side', value: 'Side' },
          { key: 'quote_value', value: 'Quote Value' },
          { key: 'base_quantity', value: 'Base Quantity' },
          {key: 'destinations[0].leg_id', value: 'Destination Portfolio'}
        ]}
        rows={FilteredAllocations}
      >
        <strong slot="title">Filtered Allocations List</strong>
        <span slot="description" style="font-size: 1rem">
          List historical allocations for a given portfolio..
          /v1/portfolios/portfolio_id/allocations
        </span>
        <span slot="cell" let:row let:cell>
            {#if cell.key === 'id' && cell.value}
              <Link href="/Orders/Allocations/{cell.value}">
               {cell.value}
              </Link>
            {:else}{cell.value}{/if}
          </span>
      </DataTable>
    {:else}
      <DataTable
        size="short"
        headers={[
          { key: 'id', value: 'Root Id' },
          { key: 'product_id', value: 'Product Id' },
          { key: 'status', value: 'Status'},
          { key: 'side', value: 'Side' },
          { key: 'quote_value', value: 'Quote Value' },
          { key: 'base_quantity', value: 'Base Quantity' },
          {key: 'destinations[0].leg_id', value: 'Destination Portfolio'}
        ]}
        rows={allocations}
      >
        <strong slot="title">Allocations List</strong>
        <span slot="description" style="font-size: 1rem">
          <ul class="list-disc" style="padding-left: 1rem">
            <li>List historical Allocations for a given portfolio..</li>
            <li>
              API Docs: <OutboundLink
                href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioallocations"
                >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioallocations</OutboundLink
              >
            </li>
            <li>Endpoint: /v1/portfolios/portfolio_id/allocations</li>
          </ul>
        </span>
         <span slot="cell" let:row let:cell>
            {#if cell.key === 'id' && cell.value}
              <Link href="/Orders/Allocations/{cell.value}">
               {cell.value}
              </Link>
            {:else}{cell.value}{/if}
          </span>
        
      </DataTable>
    {/if}
  {:else}
    <h3>Loading...</h3>
  {/if}
  