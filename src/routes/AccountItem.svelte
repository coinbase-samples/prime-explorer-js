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

  import { DataTable, Content } from 'carbon-components-svelte';
  import AccountItem from './AccountItem.svelte';

  let drinks;
</script>

<Content class="layout">
  <DataTable
    on:click={AccountItem}
    title="List of Open/Un-settled Orders."
    description="List your current open orders from the profile that the API key belongs to. Only open or un-settled orders are returned."
    headers={[
      { key: 'id', value: 'Id' },
      { key: 'price', value: 'Price' },
      { key: 'size', value: 'Size' },
      { key: 'product_id', value: 'Product Id' },
      { key: 'status', value: 'Status' },
      { key: 'side', value: 'Side' },
      { key: 'settled', value: 'Settled' },
    ]}
    rows={drinks}
  />
</Content>
