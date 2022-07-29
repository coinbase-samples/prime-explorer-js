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
  import { Content, CodeSnippet } from 'carbon-components-svelte';
  import { ConvertCurrency } from '../../apis/Exchange/ConvertCurrency';
  let convertCurrencyPost;
  let conversionBlock;
  let id;
  let conversionResponse;

  onMount(async () => {});

  const submitForm = async (profile_id, from, to, amount) => {
    convertCurrencyPost = await ConvertCurrency(profile_id, from, to, amount);

    conversionResponse = JSON.stringify(convertCurrencyPost);
    conversionBlock = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      profile_id: '1111',
      from: 'USD',
      to: 'USDC',
      amount: '1',
    },
    onSubmit: (values) => {
      const profile_id = id;
      const from = values.from;
      const to = values.to;
      const amount = values.amount;
      submitForm(profile_id, from, to, amount);
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
      ><b>Convert a Currency:</b></label
    ><br />
    <label for="profile_id">Profile Id</label><br />
    <input
      id="profile_id"
      name="profile_id"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.profile_id}
    />
    <label for="from">From (token)</label><br />
    <input
      id="from"
      name="from"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.from}
    />
    <label for="to">To: </label><br />
    <input
      id="to"
      name="to"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.to}
    />
    <label for="amount">Amount: </label><br />
    <input
      id="amount"
      name="amount"
      class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
      on:change={handleChange}
      bind:value={$form.amount}
    />

    <button
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      type="submit">Submit</button
    ><br /><br />
    {#if conversionBlock}
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{conversionResponse}</CodeSnippet
      >
    {/if}
  </form>
</Content>
