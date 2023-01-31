<script>
  /**
   * Copyright 2023 Coinbase Global, Inc.
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
  import { WithdrawToCoinbaseAccount } from '../../apis/Exchange/Withdrawals';

  let withdrawalPost;
  let withdrawalBlock;
  let id;
  let withdrawalResponse;

  onMount(async () => {
    const profile = await getProfiles();

    id = profile[0].id;
    withdrawalBlock = false;
  });

  const submitForm = async (amount, currency, coinbase_acccount_id) => {
    withdrawalPost = await WithdrawToCoinbaseAccount(
      amount,
      currency,
      coinbase_acccount_id
    );
    withdrawalResponse = JSON.stringify(withdrawalPost);
    withdrawalBlock = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      amount: '1',
      coinbase_account_id: 'your coinbase account id',
      currency: 'USDC',
    },
    onSubmit: (values) => {
      const amount = values.amount;
      const coinbase_acount_id = values.coinbase_account_id;
      const currency = values.currency;
      submitForm(amount, currency, coinbase_acount_id);
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
    <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
      ><b>Withdraw To Coinbase Account:</b></label
    ><br />
    <label for="amount">Amount</label><br />
    <input
      id="amount"
      name="amount"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.amount}
    />
    <label for="coinbase_account_id">Coinbase Account Id (wallet Id)</label><br
    />
    <input
      id="coinbase_account_id"
      name="coinbase_account_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.coinbase_account_id}
    />
    <label for="currency">Currency</label><br />
    <input
      id="currency"
      name="currency"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.currency}
    />

    <button
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      type="submit">Submit</button
    ><br /><br />
    {#if withdrawalBlock}
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{withdrawalResponse}</CodeSnippet
      >
    {/if}
  </form>
</Content>
