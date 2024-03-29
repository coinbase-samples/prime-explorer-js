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

  import 'carbon-components-svelte/css/white.css';
  import { getOrderId, cancelOrder } from '../../apis/Orders';
  import {
    Tile,
    CodeSnippet,
    Content,
    Button,
    Modal,
  } from 'carbon-components-svelte';
  import Nav from '../../Nav.svelte';
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';

  let orderIdDetails;
  let result;
  let payload;
  let open = false;
  let date, user_id, product_id, side, type, status;
  let codeSnippet = false;

  export let orderId;

  onMount(async () => {
    orderIdDetails = await getOrderId(orderId);
    result = orderIdDetails;

    payload = JSON.stringify(result);
    status = result.order.status;
    date = result.order.created_at;
    user_id = result.order.user_id;
    side = result.order.side;
    type = result.order.type;
    product_id = result.order.product_id;
  });

  const cancelOrderbyId = async () => {
    await cancelOrder(orderId);
    alert('Order has been cancelled');
    navigate('/Orders');
  };
</script>

<Nav />
<Content class="Layout">
  <!-- component -->
  <div class="p-10">
    <div
      class="flex  max-w-full flex-col overflow-hidden rounded bg-white shadow-lg"
    >
      <div class="flex justify-center">
        <div class="card mx-auto flex w-full flex-col p-5">
          <div class="flex flex-row justify-between ">
            <div class="mx-auto flex w-full flex-col">
              <div class="flex flex-row">
                <h1 class="text-2xl"><strong>Order Details: </strong></h1>
              </div>
              <div class="mt-3 flex flex-row justify-between">
                <div>
                  <h5><small>Transaction Date: {date}</small></h5>
                  <br />
                </div>
              </div>
            </div>
            <div class="brand">
              <span
                class="text-thumeza-500 flex transform items-center justify-center space-x-3 transition-all duration-1000 ease-out"
              >
                <img class="h-28 w-28" alt="logo" src="/coinLogo.png" />
              </span>
            </div>
          </div>

          <div class="mt-4 border-t-2 border-gray-200 " />

          <div class="mt-3 flex justify-between">
            <div class="flex flex-col ">
              <p class="">
                User Id: {user_id}<br />
                Side: {side}<br />
                Status: {status}<br />
                Type: {type}<br />
                Product Id: {product_id}
              </p>
            </div>
          </div>
          <div class="mt-8 flex flex-row justify-end">
            <div class="">
              <div class="">
                <button
                  on:click={() => (codeSnippet = true)}
                  class="printInvoice focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium leading-6 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                  ><span class="la la-download mt-1" />Show All Info</button
                >
              </div>
            </div>
          </div>

          {#if codeSnippet}
            <Tile style={{ width: '100px' }}>
              <h3>Raw Order Details:</h3>
            </Tile>
            <CodeSnippet type="multi" wrapText="true" expanded="true">
              {payload}
            </CodeSnippet>
          {/if}
        </div>
      </div>
    </div>
  </div>

  {#if status === 'OPEN'}
    <Button on:click={() => (open = true)} style="background: #750e13"
      >Cancel Order</Button
    >
    <Modal
      bind:open
      modalHeading="Are you sure you want to Cancel this order?"
      primaryButtonText="Confirm Cancel"
      secondaryButtonText="Go Back"
      on:click:button--secondary={() => (open = false)}
      on:open
      on:close
      on:submit={cancelOrderbyId}
    />
  {/if}
</Content>
