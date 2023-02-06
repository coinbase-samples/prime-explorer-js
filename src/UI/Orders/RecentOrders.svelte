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
  import { DataTable, Link } from 'carbon-components-svelte';
  import { getOrders } from '../../apis/Orders';
  import Nav from '../../Nav.svelte';

  let orders;
  let fetchOrders;

  const start_date = new Date(-1).toISOString();
  onMount(async () => {
    fetchOrders = await getOrders(`start_date=${start_date}&limit=4`);
    orders = fetchOrders.orders;
  });
</script>

<Nav />

<DataTable
  size="medium"
  headers={[
    { key: 'id', value: 'Id' },
    { key: 'product_id', value: 'Product Id' },
    { key: 'side', value: 'side' },
    { key: 'type', value: 'Type' },
    { key: 'created_at', value: 'Created At' },
    { key: 'base_quantity', value: 'Base Quantity' },
  ]}
  rows={orders}
>
  <span slot="cell" let:row let:cell>
    {#if cell.key === 'id' && cell.value}
      <Link href="/Orders/{cell.value}">
        {cell.value}
      </Link>
    {:else}{cell.value}{/if}
  </span>
</DataTable>
