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

  import { getProfiles } from '../../apis/Exchange/Profiles';
  import { onMount } from 'svelte';
  import 'carbon-components-svelte/css/white.css';
  import Nav from '../../Nav.svelte';
  import { createForm } from 'svelte-forms-lib';
  import { Content, CodeSnippet } from 'carbon-components-svelte';
  import { DepositToExchangeAccount } from '../../apis/Exchange/Deposits';

  let depositPost;
  let depositBlock;
  let id;
  let depositResponse;

  onMount(async () => {
    const profile = await getProfiles();

    id = profile[0].id;
    depositBlock = false;
  });

  const submitForm = async (amount, profile_id, currency, coinbase_account_id) => {
    depositPost = await DepositToExchangeAccount(
      amount,
      profile_id,
      currency,
      coinbase_account_id
    );
    depositResponse = JSON.stringify(depositPost);
    depositBlock = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      amount: '1',
      currency: 'USDC',
    },
    onSubmit: (values) => {
      const amount = values.amount;
      const profile_id = values.profile_id; 
      const currency = values.currency;
      const coinbase_account_id = values.coinbase_account_id;
      submitForm(amount, profile_id,currency, coinbase_account_id);
    },
  });
</script>

<Nav />
<Content class="Layout">
  <h4 style="color: #1554f0">Exchange Profile Id: {id}</h4>
  <form
    on:submit={handleSubmit}
    class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
  >
    <label for="type" class="mb-2 block text-sm font-bold text-gray-700"
      ><b>Deposit from Retail to Exchange:</b></label
    ><br />
    <label for="amount">Amount</label><br />
    <input
      id="amount"
      name="amount"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.amount}
    />
    <label for="profile_id">Profile Id</label><br />
    <input
      id="profile_id"
      name="profile_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.profile_id}
    />
    <label for="currency">Currency</label><br />
    <input
      id="currency"
      name="currency"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.currency}
    />
    
    <input
      id="coinbase_account_id"
      name="coinbase_account_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.coinbase_account_id}
    />

    <button
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      type="submit">Submit</button
    ><br /><br />
    {#if depositBlock}
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{depositResponse}</CodeSnippet
      >
    {/if}
  </form>
</Content>
