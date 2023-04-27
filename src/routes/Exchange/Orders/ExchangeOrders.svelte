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
  import {getOrderById, getOrderFills} from '../../../apis/Exchange/Orders';
  import Nav from '../../../Nav.svelte';
  import {
    Button,
    DataTable,
    Link,
    OutboundLink,
    Pagination,
    Content
  } from 'carbon-components-svelte';
  import { createForm } from 'svelte-forms-lib';
  import { generateQueryparams } from '../../../utils/queryParams';

  let orders;
  let ordersFilter;
  let ordersForm = false;
  let ordersFilterView = false;
  
  let loaded;

  onMount(async () => {

    orders = await getOrderFills();
    console.log(orders)
    loaded = true;

  });

 



  const submitForm = async (
    product_id,
    order_id,
    
  ) => {
    const queryParams = {
      product_id,
      order_id,
      
    };

    const stringifiedQueryParams = generateQueryparams(queryParams);
    
    ordersFilter = await getOrderFills(stringifiedQueryParams);
    ordersFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      product_id: 'MATIC-USD',
      order_id: 'a22b0faf-3ac3-49b3-b69e-abd64453ac7c'
    },
    onSubmit: (values) => {
      const order_id= values.order_id;
      const product_id = values.product_id;
      

      submitForm(
        product_id,
        order_id,
      
      );
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
        class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="order_id"><b>Order ID: </b></label
        ><br />
        <input
          id="order_id"
          name="order_id"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
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
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.product_id}
        >
          <option />
          <option>BTC-USD</option>
          <option>ETH-USD</option>
          <option>MATIC-USD</option>
          <option>DOGE-USD</option>
          <option>ADA-USD</option>

        </select>

       
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
 
  {#if ordersFilterView} 
     <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Order Id' },
        { key: 'settled', value: 'Settled' },
        { key: 'product_id', value: 'Product Id' },
        { key: 'side', value: 'Side' },
        { key: 'price', value: 'Price' },
        { key: 'created_at', value: 'Created At' },
        { key: 'size', value: 'Size' },
      ]}
      rows={ordersFilter}
    >
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
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Order Id' },
        { key: 'settled', value: 'Settled' },
        { key: 'product_id', value: 'Product Id' },
        { key: 'side', value: 'Side' },
        { key: 'price', value: 'Price' },
        { key: 'created_at', value: 'Created At' },
        { key: 'size', value: 'Size' },
      ]}
      rows={orders}
    >
      <strong slot="title">Exchange Orders List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>List historical Fills for a given Profile..</li>
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getfills"
              >https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getfills</OutboundLink
            >
          </li>
          <li>Endpoint: /fills</li>
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
