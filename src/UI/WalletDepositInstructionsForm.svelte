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

  import { createForm } from 'svelte-forms-lib';
  import { getWalletDepositDetails } from '../apis/Wallets';
  import { depositInstructions } from '../stores/depositDetails-store';

  export let walletId;

  const submitForm = async (type) => {
    const depositDetails = await getWalletDepositDetails(walletId, type);
    const response = JSON.stringify(depositDetails);

    updateDepositsStore(response);
  };

  const updateDepositsStore = (response) => {
    depositInstructions.update((recentDepositLookup) => {
      return [...recentDepositLookup, response];
    });
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      type: 'CRYPTO',
    },
    onSubmit: (values) => {
      const type = values.type;
      submitForm(type);
    },
  });
</script>

<form
  on:submit={handleSubmit}
  class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
>
  <label class="mb-2 block text-sm font-bold text-gray-700" for="type"
    ><b>Deposit Type</b></label
  ><br />
  <select
    id="type"
    name="type"
    class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
    on:change={handleChange}
    bind:value={$form.type}
  >
    <option />
    <option>CRYPTO</option>
    <option>WIRE</option>
    <option>SEN</option>
    <option>SWIFT</option>
  </select>
  <button
    class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
    type="submit">Submit</button
  >
</form>
