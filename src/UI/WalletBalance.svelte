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

  import { getWalletBalance } from '../apis/Wallets';
  import { onMount } from 'svelte';

  export let walletId;
  let walletBalanceDetails;
  onMount(async () => {
    walletBalanceDetails = await getWalletBalance(walletId);
  });
</script>

<h4>Balance Amount: {walletBalanceDetails?.balance.amount}</h4>
<h4>Bonded Amount: {walletBalanceDetails?.balance.bonded_amount}</h4>
<h4>Reserved Amount: {walletBalanceDetails?.balance.reserved_amount}</h4>
<h4>Unbonded Amount: {walletBalanceDetails?.balance.unbonding_amount}</h4>
<h4>Unvested Amount: {walletBalanceDetails?.balance.unvested_amount}</h4>
<h4>Rewards Amount: {walletBalanceDetails?.balance.pending_rewards_amount}</h4>
<h4>Past Rewards Amount: {walletBalanceDetails?.balance.past_rewards_amount}</h4>
<br />




