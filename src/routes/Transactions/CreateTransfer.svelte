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
  import { CreateTransfer } from '../../apis/CreateTransfer';
  import { navigate } from 'svelte-routing';

  let initiateTransferPost;
  let transferBlock;
  let initiateTransferResponse;
  let transferAPIResponse;

  onMount(async () => {
    transferBlock = false;
    transferAPIResponse = false;
  });

  const submitForm = async (
    wallet_id,
    amount,
    destination,
    currency_symbol
  ) => {
    initiateTransferPost = await CreateTransfer(
      wallet_id,
      amount,
      destination,
      currency_symbol
    );
    const activityId = initiateTransferPost.activity_id;
    initiateTransferResponse = JSON.stringify(initiateTransferPost);
    if (activityId) {
      transferAPIResponse = true;
      alert('Transfer initiated, your Activity Id is: ' + activityId);
      navigate(`/Activities/${activityId}`);
    }
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      wallet_id: '',
      amount: '1',
      destination: '',
      currency_symbol: 'sol',
    },
    onSubmit: (values) => {
      const wallet_id = values.wallet_id;
      const amount = values.amount;
      const destination = values.destination;
      const currency_symbol = values.currency_symbol;
      submitForm(wallet_id, amount, destination, currency_symbol);
    },
  });
</script>

<Nav />
<Content class="Layout">
  {#if transferBlock}
    <form
      on:submit={handleSubmit}
      class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
    >
      <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
        ><b>Create An Internal Transfer:</b></label
      ><br />
      <label for="wallet_id">From Wallet Id:</label><br />
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
      <label for="destination">Destination</label><br />
      <input
        id="destination"
        name="destination"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.destination}
      />
      <label for="currency_symbol">Currency Symbol Type</label><br />
      <input
        id="currency_symbol"
        name="currency_symbol"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.currency_symbol}
      />

      <Button
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="submit">Submit</Button
      >
      <Button
        on:click={() => (transferBlock = false)}
        class="focus:outline-none focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Close</Button
      >
      {#if transferAPIResponse}
        <CodeSnippet type="multi" wrapText="true" expanded="true"
          >{initiateTransferResponse}</CodeSnippet
        >
      {/if}
    </form>
  {:else}
    <Button
      on:click={() => (transferBlock = true)}
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >Create Transfer</Button
    >
  {/if}
</Content>
