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
  import 'carbon-components-svelte/css/white.css';
  import { createForm } from 'svelte-forms-lib';
  import { Button, CodeSnippet } from 'carbon-components-svelte';
  import { CreateAllowedAddress } from '../apis/AddressBook';

  let createAddressPost;
  let addressBlock;
  let createAddressResponse;
  let addressAPIResponse;

  onMount(async () => {
    addressBlock = true;
    addressAPIResponse = false;
  });

  const submitForm = async (
    address,
    name,
    currency_symbol,
    account_identifier
  ) => {
    createAddressPost = await CreateAllowedAddress(
      address,
      name,
      currency_symbol,
      account_identifier
    );
    createAddressResponse = JSON.stringify(createAddressPost);
    addressAPIResponse = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      address: '',
      name: 'Enter a custom wallet name',
      currency_symbol: 'btc',
      account_identifier: '',
    },
    onSubmit: (values) => {
      const address = values.address;
      const name = values.name;
      const currency_symbol = values.currency_symbol;
      const account_identifier = values.account_identifier;
      submitForm(address, name, currency_symbol, account_identifier);
    },
  });
</script>

<div class="mb-4">
  {#if addressBlock}
    <form
      on:submit={handleSubmit}
      class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
    >
      <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
        ><b>Create A Vault address:</b></label
      ><br />
      <label for="address">Address:</label><br />
      <input
        id="address"
        name="address"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.address}
      />
      <label for="name">Name:</label><br />
      <input
        id="name"
        name="name"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.name}
      />
      <label for="currency_symbol">Currency Symbol:</label><br />
      <input
        id="currency_symbol"
        name="currency_symbol"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.currency_symbol}
      />
      <label for="account_identifier">Account Identifier Type</label><br />
      <input
        id="account_identifier"
        name="account_identifier"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.account_identifier}
      />

      <Button
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="submit">Submit</Button
      >
      {#if addressAPIResponse}
        <CodeSnippet type="multi" wrapText="true" expanded="true"
          >{createAddressResponse}</CodeSnippet
        >
      {/if}
    </form>
  {/if}
</div>
