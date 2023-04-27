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
  import { createForm } from 'svelte-forms-lib';
  import { getWalletTransactions } from '../../apis/Wallets';
  import { Content, Button, DataTable, Link } from 'carbon-components-svelte';
  import Nav from '../../Nav.svelte';
  import { generateQueryparams } from '../../utils/queryParams';

  export let walletId;
  let walletTransactions;
  let WalletTransactionsFilter;
  let walletTransactionsForm = false;
  let walletFilterView = false;
  let loaded;

  let queryParams;

  onMount(async () => {
    walletTransactions = await getWalletTransactions(walletId);
    loaded = true;
  });

  const submitForm = async (
    type,
    sort_direction,
    startTime,
    endTime,
    limit
  ) => {
    queryParams = {
      types: type,
      order: sort_direction,
      start_time: startTime,
      end_time: endTime,
      limit,
    };
   
    const stringifiedQueryParams = generateQueryparams(queryParams);
    WalletTransactionsFilter = await getWalletTransactions(
      walletId,
      stringifiedQueryParams
    );
    walletFilterView = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      start_time: '2022-06-05T14:48:00.000Z',
      end_time: '2022-10-06T14:48:00.000Z',
      limit: '2',
      sort_direction: 'ASC',
    },
    onSubmit: (values) => {
      const type = values.type;
      const start_time = values.start_time;
      const end_time = values.end_time;
      const limit = values.limit;
      const sort_direction = values.sort_direction;
      submitForm(type, sort_direction, start_time, end_time, limit);
    },
  });
</script>

{#if loaded}
  <Content class="Layout">
    {#if walletTransactionsForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <label class="mb-2 block text-sm font-bold text-gray-700" for="type"
            ><b>Types: </b></label
          ><br />
          <select
            id="type"
            name="type"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.type}
          >
            <option />
            <option>DEPOSIT</option>
            <option>WITHDRAWAL</option>
            <option>INTERNAL_DEPOSIT</option>
            <option>INTERNAL_WITHDRAWAL</option>
            <option>SWEEP_DEPOSIT</option>
            <option>SWEEP_WITHDRAWAL</option>
            <option>STAKE</option>
            <option>PROXY_WITHDRAWAL</option>
            <option>BILLING_WITHDRAWAL</option>
            <option>REWARD</option>
            <option>COINBASE_REFUND</option>
            <option>TRANSACTION_TYPE_OTHER</option>
          </select>
          <label class="mb-2 block text-sm font-bold text-gray-700" for="order"
            >Sort Direction:
          </label>
          <input
            id="order"
            name="order"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.order}
          />

          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="start_time"><b>Start Time: </b></label
          ><br />
          <input
            id="start_time"
            name="start_time"
            on:change={handleChange}
            bind:value={$form.start_time}
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          />
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="end_time"
            >End Time:
          </label>
          <input
            id="end_time"
            name="end_time"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.end_time}
          />
          <br /><br />
          <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
            >Results Limit:
          </label>
          <input
            id="limit"
            name="limit"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.limit}
          />
          <br /><br />

          <br /><br />
          <Button
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit">Submit</Button
          >
          <Button
            on:click={() => (walletTransactionsForm = false)}
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <Button
        on:click={() => (walletTransactionsForm = true)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Filter Transactions</Button
      >
    {/if}
  </Content>
  <Nav />
  {#if walletFilterView}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'wallet_id', value: 'Wallet Id' },
        { key: 'status', value: 'Status' },
        { key: 'type', value: 'Transaction Type' },
        { key: 'symbol', value: 'Symbol' },
        { key: 'created_at', value: 'Created At' },
        { key: 'blockchain_ids', value: 'Blockchain Id' },
      ]}
      rows={WalletTransactionsFilter}
    >
      <strong slot="title">Filtered Wallet Transactions List</strong>
      <span slot="description" style="font-size: 1rem">
        Retrieve transactions for a given portfolio (only transactions that
        affect balances are accessible).
        /v1/portfolios/portfolio_id/transactions
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Transactions/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {:else}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'wallet_id', value: 'Wallet Id' },
        { key: 'status', value: 'Status' },
        { key: 'type', value: 'Transaction Type' },
        { key: 'symbol', value: 'Symbol' },
        { key: 'created_at', value: 'Created At' },
        { key: 'blockchain_ids', value: 'Blockchain Id' },
      ]}
      rows={walletTransactions}
    >
      <strong slot="title">Wallet Transactions List</strong>
      <span slot="description" style="font-size: 1rem">
        Retrieve transactions for a given Wallet.
        /v1/portfolios/portfolio_id/wallet_id/transactions
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Transactions/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {/if}
{:else}
  <h3>Loading...</h3>
{/if}
