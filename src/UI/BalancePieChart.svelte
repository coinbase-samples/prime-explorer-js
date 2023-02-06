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

  import { getHotBalance } from '.././apis/Balances';
  import { onMount } from 'svelte';

  let result;
  let hotBalanceDetails;
  let hotBalance_amount;
  let vault_amount;
  onMount(async () => {
    hotBalanceDetails = await getHotBalance();
    result = hotBalanceDetails;
    hotBalance_amount = result.trading_balances.total;
    vault_amount = result.vault_balances.total;
  });
</script>

<h4 style="color: #1554f0">
  Trading Balance: {hotBalance_amount} / Vault Balance: {vault_amount}
</h4>
