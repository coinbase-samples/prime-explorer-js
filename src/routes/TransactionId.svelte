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
  import { Tile, CodeSnippet } from 'carbon-components-svelte';
  import Nav from '../Nav.svelte';

  import { Content } from 'carbon-components-svelte';
  import { onMount } from 'svelte';
  import { getTransactionId } from '../apis/Transactions';

  let transactionIdDetails;
  let result;
  let amount;
  let id;
  let payload;

  export let transactionId;

  onMount(async () => {
    transactionIdDetails = await getTransactionId(transactionId);

    result = transactionIdDetails;

    amount = result.amount;
    id = result.id;
    payload = JSON.stringify(result);
  });
</script>

<Nav />
<Content class="Layout">
  <Tile style={{ width: '100px' }}>
    <h3>Transaction Details:</h3>
  </Tile>

  <CodeSnippet type="multi" wrapText="true" expanded="true">
    {payload}
  </CodeSnippet>
</Content>
