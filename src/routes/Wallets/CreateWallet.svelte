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
  import { CreateWallet } from '../../apis/Wallets';

  let createWalletPost;
  let walletBlock;
  let createWalletResponse;
  let walletAPIResponse;

  onMount(async () => {
    walletBlock = false;
    walletAPIResponse = false;
  });

  const submitForm = async (name, symbol, wallet_type) => {
    createWalletPost = await CreateWallet(name, symbol, wallet_type);

    createWalletResponse = JSON.stringify(createWalletPost);
    walletAPIResponse = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: 'JsonPrix Wallet',
      symbol: 'btc',
      wallet_type: 'VAULT',
    },
    onSubmit: (values) => {
      const name = values.name;
      const symbol = values.symbol;
      const wallet_type = values.wallet_type;
      submitForm(name, symbol, wallet_type);
    },
  });
</script>

<Nav />
<Content class="Layout">
  {#if walletBlock}
    <form
      on:submit={handleSubmit}
      class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
    >
      <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
        ><b>Create A Vault Wallet:</b></label
      ><br />
      <label for="name">Name:</label><br />
      <input
        id="name"
        name="name"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.name}
      />
      <label for="symbol">Symbol:</label><br />
      <input
        id="symbol"
        name="symbol"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.symbol}
      />
      <label for="wallet_type">Wallet Type</label><br />
      <input
        id="wallet_type"
        name="wallet_type"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.wallet_type}
      />

      <Button
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="submit">Submit</Button
      >
      <Button
        on:click={() => (walletBlock = false)}
        class="focus:outline-none focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Close</Button
      >
      {#if walletAPIResponse}
        <CodeSnippet type="multi" wrapText="true" expanded="true"
          >{createWalletResponse}</CodeSnippet
        >
      {/if}
    </form>
  {:else}
    <Button
      on:click={() => (walletBlock = true)}
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >Create Wallet</Button
    >
  {/if}
</Content>
