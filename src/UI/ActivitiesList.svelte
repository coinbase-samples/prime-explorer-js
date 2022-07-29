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

  import { onMount } from 'svelte';
  import queryString from 'querystring';
  import _ from 'lodash-es';
  import {
    Content,
    Button,
    DataTable,
    Link,
    OutboundLink,
  } from 'carbon-components-svelte';

  import { createForm } from 'svelte-forms-lib';
  import { getActivities } from '../apis/Activities';
  import Nav from '../Nav.svelte';

  let activities;
  let activitiesFilter;
  let activitiesForm = false;
  let activitiesFilterView = false;
  let loaded;

  let queryParams;

  onMount(async () => {
    activities = await getActivities();
    loaded = true;
  });

  const submitForm = async (
    categories,
    status,
    order,
    startTime,
    endTime,
    limit
  ) => {
    queryParams = {
      categories,
      status,
      order,
      start_time: startTime,
      end_time: endTime,
      limit,
    };
    const filteredQueryParams = _.omitBy(
      queryParams,
      (v) => _.isUndefined(v) || _.isNull(v) || v === ''
    );

    const stringifiedQueryParams = queryString.stringify(filteredQueryParams);

    activitiesFilter = await getActivities(stringifiedQueryParams);
    activitiesFilterView = true;
    closeForm();
  };

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      start_time: '2022-05-05T14:48:00.000Z',
      end_time: '2022-05-25T14:48:00.000Z',
      limit: '20',
      order: 'ASC',
      status: 'CANCELLED',
      categories: 'ACTIVITY_CATEGORY_ORDER',
    },
    onSubmit: (values) => {
      const categories = values.categories;
      const status = values.status;
      const start_time = values.start_time;
      const end_time = values.end_time;
      const limit = values.limit;
      const order = values.order;
      submitForm(categories, status, order, start_time, end_time, limit);
    },
  });

  const closeForm = () => {
    activitiesForm = false;
    activitiesFilterView = false;
  };
</script>

{#if loaded}
  <Content class="Layout">
    {#if activitiesForm}
      <div class="mb-4">
        <form
          on:submit={handleSubmit}
          class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="categories"><b>Categories: </b></label
          ><br />
          <select
            id="categories"
            name="categories"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.categories}
          >
            <option />
            <option>OTHER_ACTIVITY_CATEGORY</option>
            <option>ACTIVITY_CATEGORY_ORDER</option>
            <option>ACTIVITY_CATEGORY_TRANSACTION</option>
            <option>ACTIVITY_CATEGORY_ACCOUNT</option>
            <option>ACTIVITY_CATEGORY_ADMING</option>
            <option>ACTIVITY_CATEGORY_ALLOCATION</option>
          </select>
          <label class="mb-2 block text-sm font-bold text-gray-700" for="status"
            ><b>status: </b></label
          ><br />
          <select
            id="status"
            name="status"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.status}
          >
            <option />
            <option>ACTIVITY_STATUS_CANCELLED</option>
            <option>ACTIVITY_STATUS_PROCESSING</option>
            <option>ACTIVITY_STATUS_COMPLETED</option>
            <option>ACTIVITY_STATUS_EXPIRED</option>
            <option>ACTIVITY_STATUS_REJECTED</option>
            <option>ACTIVITY_STATUS_FAILED</option>
          </select>
          <label class="mb-2 block text-sm font-bold text-gray-700" for="order"
            >Sort Direction:
          </label>
          <input
            id="order"
            name="order"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.order}
          />

          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="start_time"><b>Start Time: </b></label
          ><br />
          <input
            id="start_time"
            name="start_time"
            on:change={handleChange}
            bind:value={$form.start_time}
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
          />
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="end_time"
            >End Time:
          </label>
          <input
            id="end_time"
            name="end_time"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.end_time}
          />
          <br /><br />
          <label class="mb-2 block text-sm font-bold text-gray-700" for="limit"
            >Results Limit:
          </label>
          <input
            id="limit"
            name="limit"
            class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
            on:change={handleChange}
            bind:value={$form.limit}
          />
          <br /><br />

          <br /><br />
          <Button
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit">Submit</Button
          >
          <Button
            on:click={closeForm}
            class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >Close</Button
          >
        </form>
      </div>
      <br />
    {:else}
      <Button
        on:click={() => (activitiesForm = true)}
        class="focus:outline-none focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >Filter Activities</Button
      >
    {/if}
  </Content>
  <Nav />
  {#if activitiesFilterView}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'type', value: 'Activity Type' },
        { key: 'status', value: 'Status' },
        { key: 'title', value: 'Title' },
        { key: 'user_actions[0].user_id', value: 'User Id' },
        { key: 'created_at', value: 'Created At' },
        { key: 'user_actions[0].timestamp', value: 'Timestamp' },
      ]}
      rows={activitiesFilter}
    >
      <strong slot="title">Filtered Activities List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>
            Retrieve Activities for a given portfolio (only Activities that
            affect balances are accessible).
          </li>
          <li>
            API Docs:
            https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioactivities
          </li>
          <li>Endpoint: /v1/portfolios/portfolio_id/activities</li>
        </ul>
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Activities/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {:else}
    <DataTable
      size="short"
      headers={[
        { key: 'id', value: 'Id' },
        { key: 'type', value: 'Activity Type' },
        { key: 'status', value: 'Status' },
        { key: 'title', value: 'Title' },
        { key: 'user_actions[0].user_id', value: 'User Id' },
        { key: 'created_at', value: 'Created At' },
        { key: 'user_actions[0].timestamp', value: 'Timestamp' },
      ]}
      rows={activities}
    >
      <strong slot="title">Activities List</strong>
      <span slot="description" style="font-size: 1rem">
        <ul class="list-disc" style="padding-left: 1rem">
          <li>
            Retrieve Activities for a given portfolio (only Activities that
            affect balances are accessible).
          </li>
          <li>
            API Docs: <OutboundLink
              >https://docs.cloud.coinbase.com/prime/reference/primerestapi_getportfolioactivities</OutboundLink
            >
          </li>
          <li>Endpoint: /v1/portfolios/portfolio_id/activities</li>
        </ul>
      </span>
      <span slot="cell" let:row let:cell>
        {#if cell.key === 'id' && cell.value}
          <Link href="/Activities/{cell.value}">
            {cell.value}
          </Link>
        {:else}{cell.value}{/if}
      </span>
    </DataTable>
  {/if}
{:else}
  <h3>Loading...</h3>
{/if}
