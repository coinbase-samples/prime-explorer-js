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
  import { Content, DataTable } from 'carbon-components-svelte';
  import { getTransfers } from '../../apis/Exchange/Transfers';
  import Nav from '../../Nav.svelte';

  let transfers;
  let loaded;

  onMount(async () => {
    transfers = await getTransfers();
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
        { key: 'type', value: 'Type' },
        { key: 'created_at', value: 'Created At' },
        { key: 'currency', value: 'Currency' },
        { key: 'details.coinbase_account_id', value: 'Coinbase Account Id' },
      ]}
      rows={transfers}
    >
      <strong slot="title">Transfers List</strong>
      <span slot="description" style="font-size: 1rem">
        Retrieve Transfers
      </span>
    </DataTable>
  {:else}
    <h3>Loading...</h3>
  {/if}
</Content>
