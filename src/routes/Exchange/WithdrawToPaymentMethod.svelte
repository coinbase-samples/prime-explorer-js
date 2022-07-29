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

  import { getProfiles } from '../../apis/Exchange/Profiles';
  import { onMount } from 'svelte';
  import 'carbon-components-svelte/css/white.css';
  import Nav from '../../Nav.svelte';
  import { createForm } from 'svelte-forms-lib';
  import { Content, CodeSnippet } from 'carbon-components-svelte';
  import { WithdrawToPaymentMethod } from '../../apis/Exchange/Withdrawals';

  let withdrawalPost;
  let withdrawalBlock;
  let id;
  let withdrawalResponse;

  onMount(async () => {
    const profile = await getProfiles();

    id = profile[0].id;
    withdrawalBlock = false;
  });

  const submitForm = async (amount, currency, payment_method_id) => {
    withdrawalPost = await WithdrawToPaymentMethod(
      amount,
      currency,
      payment_method_id
    );
    withdrawalResponse = JSON.stringify(withdrawalPost);
    withdrawalBlock = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      amount: '1',
      payment_method_id: 'bf6880e3-9a76-5d94-9bb8-3e5f71590465',
      currency: 'USD',
    },
    onSubmit: (values) => {
      const amount = values.amount;
      const payment_method_id = values.payment_method_id;
      const currency = values.currency;
      submitForm(amount, currency, payment_method_id);
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
      ><b>Withdraw To Payment Method:</b></label
    ><br />
    <label for="amount">Amount</label><br />
    <input
      id="amount"
      name="amount"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.amount}
    />
    <label for="payment_method_id">Payment Method Id</label><br />
    <input
      id="payment_method_id"
      name="payment_method_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.payment_method_id}
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
