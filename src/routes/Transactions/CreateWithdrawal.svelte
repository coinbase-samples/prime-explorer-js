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
  import { navigate } from 'svelte-routing';
  import { CreateWithdrawal } from '../../apis/Withdrawals';

  let initiateWithdrawalPost;
  let transferBlock;
  let withdrawalBlock;
  let initiateTransferResponse;
  let transferAPIResponse;
  let withdrawal_type;

  onMount(async () => {
    transferBlock = false;
    transferAPIResponse = false;
  });

  const submitForm = async (
    wallet_id,
    amount,
    destination_address,
    currency_symbol,
    account_identifier,
    withdrawal_type
  ) => {
    initiateWithdrawalPost = await CreateWithdrawal(
      wallet_id,
      amount,
      currency_symbol,
      destination_address,
      account_identifier,
      withdrawal_type
    );
    const activityId = initiateWithdrawalPost.activity_id;
    initiateTransferResponse = JSON.stringify(initiateWithdrawalPost);
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
      currency_symbol: 'eth',
      payment_method_id: '',
    },
    onSubmit: (values) => {
      const wallet_id = values.wallet_id;
      const amount = values.amount;
      const currency_symbol = values.currency_symbol;
      const destination_address = values.destination_address;
      const account_identifier = values.account_identifier;
      const withdrawal_type = values.withdrawal_type;
      const payment_method_id = values.payment_method_id;
      if (withdrawal_type === 'crypto') {
        submitForm(
          wallet_id,
          amount,
          destination_address,
          currency_symbol,
          account_identifier,
          withdrawal_type
        );
      } else {
        submitForm(
          wallet_id,
          amount,
          payment_method_id,
          currency_symbol,
          account_identifier,
          withdrawal_type
        );
      }
    },
  });
</script>

<Nav />
<Content class="Layout">
  {#if withdrawalBlock}
    <form
      on:submit={handleSubmit}
      class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
    >
      <label htmlFor="type" class="mb-2 block text-sm font-bold text-gray-700"
        ><b>Create An Withdrawal:</b></label
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
      <label for="currency_symbol">Currency Symbol Type</label><br />
      <input
        id="currency_symbol"
        name="currency_symbol"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={$form.currency_symbol}
      />
      <label for="withdrawal_type">Choose your Withdrawal Type: </label><br />
      <select
        id="withdrawal_type"
        name="withdrawal_type"
        class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
        on:change={handleChange}
        bind:value={withdrawal_type}
      >
        <option />
        <option>payment</option>
        <option>crypto</option>
      </select>
      {#if withdrawal_type === 'payment'}
        <label for="payment_method_id"
          >Please Enter your Payment Method Id:
        </label><br />
        <input
          id="payment_method_id"
          name="payment_method_id"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.payment_method_id}
        />
      {:else if withdrawal_type === 'crypto'}
        <label for="destination_address"
          >Please Enter your Crypto Destination Address:
        </label><br />
        <input
          id="destination_address"
          name="destination_address"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.destination_address}
        />
        <label for="account_identifier">Please Enter your Memo: </label><br />
        <input
          id="account_identifier"
          name="account_identifier"
          class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          on:change={handleChange}
          bind:value={$form.account_identifier}
        />
      {/if}
      <Button
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="submit">Submit</Button
      >
      <Button
        on:click={() => (withdrawalBlock = false)}
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
      on:click={() => (withdrawalBlock = true)}
      class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >Create Withdrawal</Button
    >
  {/if}
</Content>
