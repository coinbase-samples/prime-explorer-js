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

  import { getProfiles } from '../../apis/Exchange/Profiles';
  import { CreateCryptoAddress } from '../../apis/Exchange/GenerateACryptoAddress';
  import { onMount } from 'svelte';
  import { assetsMenuList } from '../../utils/constants';
  import 'carbon-components-svelte/css/white.css';
  import Nav from '../../Nav.svelte';
  import { createForm } from 'svelte-forms-lib';
  import { Content, CodeSnippet } from 'carbon-components-svelte';

  let cryptoAddress;
  let addressBlock;
  let id;
  let addressResponse;

  onMount(async () => {
    const profile = await getProfiles();

    id = profile[0].id;
    addressBlock = false;
  });

  const submitForm = async (type) => {
    cryptoAddress = await CreateCryptoAddress(type);

    addressResponse = JSON.stringify(cryptoAddress);
    addressBlock = true;
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      address: 'BTC',
    },
    onSubmit: (values) => {
      const type = values.address;
      submitForm(type);
    },
  });
</script>

<Nav />
<Content class="Layout">
  <h4 style="color: #1554f0">Exchange Profile Id: {id}</h4>
  <form
    on:submit={handleSubmit}
    class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
  >
    <label
      for="cryptoAddress"
      class="mb-2 block text-sm font-bold text-gray-700"
      ><b>Generate Crypto Address:</b></label
    ><br />
    <select
      id="address"
      name="address"
      class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      on:change={handleChange}
      bind:value={$form.address}
    >
      {#each assetsMenuList as asset}
        <option>{asset}</option>
      {/each}
    </select>
    <button
      class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      type="submit">Submit</button
    ><br /><br />
    {#if addressBlock}
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{addressResponse}</CodeSnippet
      >
    {/if}
  </form>
</Content>
