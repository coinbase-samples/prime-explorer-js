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
  import { DataTable, OutboundLink } from 'carbon-components-svelte';
  import { getPortfolioUsers } from '../apis/Users';
  let userList;
  onMount(async () => {
    userList = await getPortfolioUsers();
  });
</script>

<DataTable
  size="short"
  headers={[
    { key: 'id', value: 'Id' },
    { key: 'name', value: 'Name' },
    { key: 'email', value: 'Email' },
    { key: 'portfolio_id', value: 'Portfolio Id' },
    { key: 'entity_id', value: 'Entity Id' },
  ]}
  rows={userList}
>
  <strong slot="title">Users List</strong>
  <span slot="description" style="font-size: 1rem">
    <ul class="list-disc" style="padding-left: 1rem">
      <li>List all users associated with a given entity.</li>
      <li>
        API Docs: <OutboundLink
          href="https://docs.cloud.coinbase.com/prime/reference/primerestapi_getentityusers"
          >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getentityusers</OutboundLink
        >
      </li>
      <li>Endpoint: /v2/entities/entity_id/users</li>
    </ul>
  </span>
</DataTable>
