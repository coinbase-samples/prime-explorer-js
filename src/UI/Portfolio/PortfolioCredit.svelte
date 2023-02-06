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

  import { getCredit } from '../../apis/Credit';
  import { onMount } from 'svelte';

  export let walletId;
  let result;
  let walletCreditDetails;
  let credit_amount;
  onMount(async () => {
    walletCreditDetails = await getCredit(walletId);
    result = walletCreditDetails.post_trade_credit.available;
    credit_amount = result.length > 0 ? result : 'Credit not supported.';
  });
</script>

<h4 style="color: #1554f0">{credit_amount}</h4>
