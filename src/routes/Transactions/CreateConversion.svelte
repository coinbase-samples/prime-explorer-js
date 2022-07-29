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

  import { onMount } from 'svelte';
  import 'carbon-components-svelte/css/white.css';
  import Nav from '../../Nav.svelte';
  import { createForm } from 'svelte-forms-lib';
  import { Button, Content, CodeSnippet } from 'carbon-components-svelte';
  import { CreateConversion } from '../../apis/Transactions';

  let createConversionPost;
  let createConversionResponse;
  let conversionAPIResponse;

  onMount(async () => {
    conversionAPIResponse = false;
  });

  const submitForm = async (
    wallet_id,
    amount,
    destination,
    source_symbol,
    destination_symbol
  ) => {
    createConversionPost = await CreateConversion(
      wallet_id,
      amount,
      destination,
      source_symbol,
      destination_symbol
    );
    createConversionResponse = JSON.stringify(createConversionPost);
    conversionAPIResponse = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    wallet_id: '',
    destination_symbol: 'USDC',

    onSubmit: (values) => {
      const wallet_id = values.wallet_id;
      const amount = values.amount;
      const destination = values.destination;
      const destination_symbol = values.destination_symbol;
      const source_symbol = values.source_symbol;
      submitForm(
        wallet_id,
        amount,
        destination,
        source_symbol,
        destination_symbol
      );
    },
  });
</script>

<Nav />
<Content class="Layout">
  <form
    on:submit={handleSubmit}
    class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
  >
    <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
      ><b>Create A Conversion:</b></label
    ><br />
    <label for="wallet_id">Wallet Id (source wallet):</label><br />
    <input
      id="wallet_id"
      name="wallet_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.wallet_id}
    />
    <label for="amount">Amount:</label><br />
    <input
      id="amount"
      name="amount"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.amount}
    />
    <label for="source_symbol"
      >Source (the source symbol to convert from):
    </label><br />
    <input
      id="source_symbol"
      name="source_symbol"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.source_symbol}
    />
    <label for="destination"
      >Destination (The UUID of the destination wallet)</label
    ><br />
    <input
      id="destination"
      name="destination"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.destination}
    />
    <label for="destination_symbol"
      >Destination Symbol (The currency symbol to convert to)</label
    ><br />
    <input
      id="destination_symbol"
      name="destination_symbol"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.destination_symbol}
    />
    <Button
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      type="submit">Submit</Button
    >

    {#if conversionAPIResponse}
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{createConversionResponse}</CodeSnippet
      >
    {/if}
  </form>
</Content>
