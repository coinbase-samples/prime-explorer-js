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

  import { getSocketSignature } from '../apis/CoinbaseAuth';
  import { onMount } from 'svelte';
  import { Content, Button, OutboundLink } from 'carbon-components-svelte';

  import { createForm } from 'svelte-forms-lib';
  import { fetchStore } from '../stores/userSession-store';

  let currentEnvironment;
  let token;
  let product;
  let socket;
  let socketOpen;
  let offerSide = 0;
  let bidSide = 0;
  const book = {};
  let buyEvents = [];
  let sellEvents = [];
  let socketForm = true;
  let loading = true;

  onMount(async () => {
    socketOpen = false;
    currentEnvironment = await fetchStore();
  });

  const startListening = async (type, channel, products) => {
    let current_price_coinbase;
    socket = new WebSocket(currentEnvironment.websocketUrl);

    const signature = await getSocketSignature(
      channel,
      currentEnvironment.sender_comp_id,
      products
    );

    //subscribe to channel
    socket.onopen = function () {
      const payload = {
        type,
        channel,
        product_ids: [products],
        access_key: `${signature.authResponse.accessKey}`,
        api_key_id: `${signature.authResponse.SVCAccountId}`,
        signature: `${signature.authResponse.signature}`,
        passphrase: `${signature.authResponse.passphrase}`,
        timestamp: `${signature.authResponse.timestamp}`,
      };

      JSON.stringify(payload);
      token = channel;
      product = products;
      socket.send(JSON.stringify(payload));
    };
    // Listen for messages
    socket.onmessage = function (event) {
      current_price_coinbase = JSON.parse(event.data);
      loading = false;

      if (
        !current_price_coinbase.events ||
        !current_price_coinbase.events.length > 0 ||
        !current_price_coinbase.events[0].updates
      )
        return;
      const allUpdates = current_price_coinbase.events[0].updates;

      allUpdates.forEach((u) => {
        if (u.qty === '0') {
          delete book[u.px];
        } else {
          u.fPrice = parseFloat(u.px);
          book[u.px] = u;
        }
      });
      let highOffer = 0;
      let lowBid = 1000000;
      const allEvents = [];
      Object.keys(book).forEach((price) => {
        const fPrice = book[price].fPrice;
        if (book[price].side === 'offer' && fPrice < lowBid) {
          lowBid = fPrice;
        } else if (book[price].side === 'bid' && fPrice > highOffer) {
          highOffer = fPrice;
        }
        allEvents.push(book[price]);
      });

      bidSide = lowBid;
      offerSide = highOffer;

      const newSellEvents = allEvents.filter((e) => e.side === 'offer');
      const newBuyEvents = allEvents.filter((e) => e.side === 'bid');

      buyEvents = newBuyEvents.slice(-25);
      sellEvents = newSellEvents.slice(-25).sort((a, b) => b.fPrice > a.fPrice);
    };
  };

  const submitForm = async (type, channel, products, senderCompId) => {
    socketOpen = true;
    socketForm = false;

    await startListening(type, channel, products, senderCompId);
  };

  const unsubscribe = () => {
    alert('you have unsubscribed');
    if (socket && socket.close) socket.close();
    socketForm = true;
    socketOpen = false;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      type: 'subscribe',
      channel: 'l2_data',
      product: 'BTC_USD',
    },
    onSubmit: (values) => {
      const type = values.type;
      const channel = values.channel;
      const products = values.product;
      submitForm(type, channel, products);
    },
  });
</script>

<Content class="Layout">
  {#if socketForm === true}
    <div class="mb-4">
      <form
        on:submit={handleSubmit}
        class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <label class="mb-2 block text-sm font-bold text-gray-700" for="type"
          ><b>Websocket Type: </b></label
        ><br />

        <ul class="list-disc" style="padding-left: 1rem; --font-size: 1rem">
          <li>
            The l2_data channel guarantees delivery of all updates and is the
            easiest way to keep a snapshot of the order book.
          </li>
          <br />
          <li>
            API Docs: <OutboundLink
              href="https://docs.cloud.coinbase.com/prime/docs/websocket-channels#level2-data-channel"
              >https://docs.cloud.coinbase.com/prime/docs/websocket-channels#level2-data-channel</OutboundLink
            >
          </li>
        </ul>
        <br />

        <select
          id="type"
          name="type"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.type}
        >
          <option>subscribe</option>
          <option>unsubscribe</option>
        </select>
        <br /><br />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="channel"
          ><b>Channel: </b></label
        ><br />
        <select
          id="channel"
          name="channel"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.channel}
        >
          <option>l2_data</option>
          <option>heartbeats</option>
        </select>
        <br /><br />
        <label class="mb-2 block text-sm font-bold text-gray-700" for="product"
          ><b>product: </b></label
        ><br />
        <select
          id="product"
          name="product"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.product}
        >
          <option>BTC-USD</option>
          <option>ETH-USD</option>
          <option>SOL-USD</option>
          <option>USDT-USD</option>
        </select>
        <br /><br />

        <Button
          class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="submit"
          >Submit
        </Button>
      </form>
    </div>
    <br />
  {/if}
  {#if socketOpen}
    <Button on:click={unsubscribe}>Unsubscribe</Button>
    <br /><br />

    <div class="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h3 class="mb-2 text-xl font-bold text-gray-900">
            Subscribing to {token} channel for products: {product} ...
          </h3>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="overflow-x-auto rounded-lg">
          {#if loading}
            <h3 class="mb-2 text-xl font-bold text-gray-900">Loading...</h3>
          {:else}
            <div class="inline-block min-w-full align-middle">
              <h3 class="mb-2 text-xl font-bold text-gray-900">
                Spread: {(bidSide - offerSide).toFixed(4)}
              </h3>
              <div class="flex gap-x-2.5 overflow-hidden shadow sm:rounded-lg">
                <table class="min-w-half divide-y divide-gray-500">
                  <thead class="bg-blue-500">
                    <tr>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Symbol
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Holds
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    {#each buyEvents as e}
                      <tr>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-normal text-gray-900"
                        >
                          <span class="font-semibold">Side: {e.side}</span>
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-normal text-gray-500"
                        >
                          <span class="font-semibold">Quantity: {e.qty}</span>
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-semibold text-gray-900"
                        >
                          <span class="font-semibold"
                            >Event Time: {e.event_time}</span
                          >
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-semibold text-gray-900"
                        >
                          <span class="font-semibold">Price: {e.px}</span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
                <table class="min-w-half divide-y divide-gray-500">
                  <thead class="bg-blue-500">
                    <tr>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Symbol
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Holds
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium font-bold uppercase tracking-wider text-white"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    {#each sellEvents as e}
                      <tr>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-normal text-gray-900"
                        >
                          <span class="font-semibold">Side: {e.side}</span>
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-normal text-gray-500"
                        >
                          <span class="font-semibold">Quantity: {e.qty}</span>
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-semibold text-gray-900"
                        >
                          <span class="font-semibold"
                            >Event Time: {e.event_time}</span
                          >
                        </td>
                        <td
                          class="whitespace-nowrap p-4 text-sm font-semibold text-gray-900"
                        >
                          <span class="font-semibold">Price: {e.px}</span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</Content>
