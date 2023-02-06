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

  import { CodeSnippet, Tile } from 'carbon-components-svelte';
  let eventResponse;
</script>

<Tile expanded="true">
  <h3>MarketDetails:</h3>
  <CodeSnippet
    type="multi"
    wrapText="true"
    expanded="true"
    style="height: 150px;"
  >
    {eventResponse}
  </CodeSnippet><br />
</Tile><br />
