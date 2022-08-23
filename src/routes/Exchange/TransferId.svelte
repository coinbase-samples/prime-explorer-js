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
  
    import 'carbon-components-svelte/css/white.css';
    import { Tile, CodeSnippet, Content } from 'carbon-components-svelte';
    import Nav from '../../Nav.svelte';
  
    import { onMount } from 'svelte';
    import { getTransferId } from '../../apis/Exchange/Transfers';
  
    let transferIdDetails = {};
    let codeSnippet = false;
  
    export let transferId;
  
    onMount(async () => {
      transferIdDetails = await getTransferId(transferId);
    });
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
                  <h1 class="text-2xl"><strong>Transfer Details: </strong></h1>
                </div>
                <div class="mt-3 flex flex-row justify-between">
                  <div>
                    <h5><small>Id: {transferIdDetails.id}</small></h5>
                    <br />
                  </div>
                </div>
              </div>
              <div class="brand">
                <span
                  class="text-thumeza-500 flex transform items-center justify-center space-x-3 transition-all duration-1000 ease-out"
                >
                  <img class="h-28 w-28" src="/coinLogo.png" alt="cb logo" />
                </span>
              </div>
            </div>
  
            <div class="mt-4 border-t-2 border-gray-200 " />
  
            <div class="mt-3 flex justify-between">
              <div class="flex flex-col ">
                <p class="">
                  Name: {transferIdDetails.name}<br />
                  Id: {transferIdDetails.id}<br />
                  Min_size: {transferIdDetails.min_size}<br />
                  Status: {transferIdDetails.status}<br />
                  Message: {transferIdDetails.message}<br />
                  Max Precision: {transferIdDetails.max_precision}<br />
                  Convertible To: {transferIdDetails.convertible_to}
                </p>
              </div>
            </div>
            <div class="mt-8 flex flex-row justify-end">
              <div class="">
                <div class="">
                  <button
                    on:click={() => (codeSnippet = !codeSnippet)}
                    class="printInvoice focus:outline-none focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium leading-6 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 sm:text-sm sm:leading-5"
                    ><span class="la la-download mt-1" />Show All Info</button
                  >
                </div>
              </div>
            </div>
  
            {#if codeSnippet}
              <Tile style={{ width: '100px' }}>
                <h3>Raw transfer Details:</h3>
              </Tile>
              <CodeSnippet type="multi" wrapText="true" expanded="true">
                {JSON.stringify(transferIdDetails)}
              </CodeSnippet>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </Content>
  