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

  import { onMount } from 'svelte';
  import { Content, DataTable, Link } from 'carbon-components-svelte';
  import { getPaymentMethods } from '../../apis/Exchange/PaymentMethods';
  import Nav from '../../Nav.svelte';

  let payments;
  let loaded;

  onMount(async () => {
    payments = await getPaymentMethods();
    loaded = true;
  });
</script>

<Nav />
<Content>
  {#if loaded}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'name', value: 'Name' },
        { key: 'status', value: 'Status' },
        { key: 'convertible_to', value: 'Convertible to' },
        { key: 'details.crypto_address_link', value: 'Details' },
      ]}
      rows={payments}
    >
      <strong slot="title">getPaymentMethods List</strong>
      <span slot="description" style="font-size: 1rem">
        Retrieve getPaymentMethods
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Exchange/payments/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {:else}
    <h3>Loading...</h3>
  {/if}
</Content>
