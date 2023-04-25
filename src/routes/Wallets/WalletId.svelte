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

  import 'carbon-components-svelte/css/white.css';
  import { CodeSnippet } from 'carbon-components-svelte';
  import Nav from '../../Nav.svelte';
  import WalletBalance from '../../UI/WalletBalance.svelte';
  import WalletDepositInstructionsForm from '../../UI/WalletDepositInstructionsForm.svelte';
  import { depositInstructions } from '../../stores/depositDetails-store';

  import { Content, Button } from 'carbon-components-svelte';
  import { onMount } from 'svelte';
  import { getWalletId } from '../../apis/Wallets';
  import WalletIdTransactions from '../../UI/Transactions/WalletIdTransactions.svelte';

  let walletIdDetails;
  let result;
  let name;
  export let walletId;
  let details = false;
  let form = false;
  let depositDetails;
  let WalletTransactionsComponent = false;

  onMount(async () => {
    walletIdDetails = await getWalletId(walletId);
    result = walletIdDetails;
    name = walletIdDetails.name;
    details = false;
  });

  const fetchStore = async () => {
    await depositInstructions.subscribe((depositRequest) => {
      depositDetails = depositRequest;
      details = true;
    });
  };

  fetchStore();

  const closeDetails = () => {
    details = false;
  };
</script>

<Nav />

<Content class="Layout">
  <!-- component -->
  <div class="p-10">
    <div
      class="flex  max-w-full flex-col overflow-hidden rounded bg-white shadow-lg"
    >
      <div class="flex justify-center">
        <div class="card mx-auto flex w-full flex-col p-5">
          <div class="flex flex-row justify-between ">
            <div class="mx-auto flex w-full flex-col">
              <div class="flex flex-row">
                <h1 class="text-2xl"><strong>Wallet Details: </strong></h1>
              </div>
              <div class="mt-3 flex flex-row justify-between">
                <div>
                  <h4>Name: {name}</h4>
                  <WalletBalance {walletId} />

                  <CodeSnippet
                    type="multi"
                    wrapText="true"
                    expanded="true"
                    style="height: 150px; position: relative; padding-top: 1 rem"
                  >
                    {JSON.stringify(result)}
                  </CodeSnippet><br />
                </div>
              </div>
              {#if walletIdDetails}
                <div class="flex flex-row">
                  <Button
                    on:click={() => (form = true)}
                    style="background: #728FCE; margin-right: 10px"
                    >Show Deposit Details</Button
                  >
                  <Button
                    on:click={() => (WalletTransactionsComponent = true)}
                    style="background: #1554f0; padding-left: 10px"
                    >Get Wallet Transactions</Button
                  ><br /><br />
                </div>
              {/if}
              {#if WalletTransactionsComponent}
                <WalletIdTransactions {walletId} />
                <Button on:click={() => (WalletTransactionsComponent = false)}
                  >Close</Button
                >
              {/if}
              {#if form === true}
                <WalletDepositInstructionsForm {walletId} />
                <Button on:click={() => (form = false)}>Close</Button>
              {/if}

              {#if details === true && depositDetails}
                <br />
                <h3>Deposit Details:</h3>
                <br />
                <CodeSnippet type="multi" wrapText="true" expanded="true">
                  {depositDetails}
                </CodeSnippet>
                <Button on:click={closeDetails} style="background: #1554f0"
                  >Close Details</Button
                ><br />
              {/if}
            </div>
          </div>
        </div>
        <div class="brand">
          <span
            class="text-thumeza-500 flex transform items-center justify-center space-x-3 transition-all duration-1000 ease-out"
          >
            <img
              class="h-28 w-28"
              src="/baseline_wallet_black_24dp.png"
              alt="Wallet Icon"
            />
          </span><br />
        </div>
      </div>
    </div>
    <div />
  </div>
</Content>
