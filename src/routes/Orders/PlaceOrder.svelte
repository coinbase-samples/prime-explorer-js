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

  import { navigate } from 'svelte-routing';
  import Nav from '../../Nav.svelte';
  import {
    Dropdown,
    Content,
    Checkbox,
    Form,
    TextInput,
    Button,
    CodeSnippet,
    Modal,
  } from 'carbon-components-svelte';
  import { createOrder, createOrderPreview } from '../../apis/Orders';

  let open = false;
  let limit_price;
  let orderSize;
  let order_type = '0';
  let time_in_force_type = '0';
  const order_type_items = [
    { id: '0', text: 'MARKET' },
    { id: '1', text: 'LIMIT' },
    { id: '2', text: 'TWAP' },
  ];
  let side = '0';

  let product_id = '0';
  let ordersPreview;
  let previewPayload;
  let iceberg = false;
  let display_base_size;

  let formValid = true;
  const product_id_items = [
    { id: '0', text: 'BTC-USD' },
    { id: '1', text: 'ETH-USD' },
    { id: '2', text: 'SOL-USD' },
  ];
  const time_in_force_items = [
    { id: '0', text: 'GOOD_UNTIL_DATE_TIME' },
    { id: '1', text: 'GOOD_UNTIL_CANCELLED' },
    { id: '2', text: 'IMMEDIATE_OR_CANCEL' },
  ];

  const side_items = [
    { id: '0', text: 'BUY' },
    { id: '1', text: 'SELL' },
  ];
  let start_time = '2022-07-31T09:59:59Z';
  let expiry_time = '2022-08-02T09:59:59Z';

  const validateForm = () => {
    const isValid = orderSize !== '' && order_type !== '';
    return isValid;
  };

  $: product_id_text =
    product_id >= 0 ? product_id_items[product_id].text : 'BTC-USD';
  $: side_text = side >= 0 ? side_items[side].text : 'Buy';
  $: order_type_text =
    order_type >= 0 ? order_type_items[order_type].text : 'MARKET';
  $: time_in_force_text =
    time_in_force_type >= 0
      ? time_in_force_items[time_in_force_type].text
      : 'GOOD_UNTIL_DATE_TIME';

  const handleSubmit = async (event) => {
    const isFormValid = validateForm();
    formValid = isFormValid;
    if (isFormValid) {
      open = true;
      ordersPreview = await createOrderPreview(
        product_id_text,
        side_text,
        order_type_text,
        orderSize,
        limit_price,
        time_in_force_text,
        start_time,
        expiry_time,
        display_base_size
      );
      previewPayload = JSON.stringify(ordersPreview);
    } else {
      event.preventDefault();
      return false;
    }
  };

  const finalRequest = async () => {
    const response = await createOrder(
      product_id_text,
      side_text,
      order_type_text,
      orderSize,
      limit_price,
      time_in_force_text,
      start_time,
      expiry_time,
      display_base_size
    );

    const orderId = response.order_id;
    if (response) {
      open = false;
      alert('Order initiated, your Order id is: ' + orderId);
      navigate(`/Orders/${orderId}`);
    }
  };
</script>

<Nav />
<Content class="Layout">
  <Modal
    class="mb-2 text-xl font-bold"
    bind:open
    modalHeading="Are you sure you want to Place this order?"
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (open = false)}
    on:open
    on:close
    on:submit={finalRequest}
  >
    <div class="max-w-lg overflow-hidden rounded shadow-lg">
      <div class="mb-2 text-xl font-bold">
        Order Preview Details:
        <p class="text-blue-600-700 text-base">Order Size:{orderSize}</p>
        <p class="text-blue-600-700 text-base">SIDE: {side_text}</p>
        <p class="text-blue-600-700 text-base">Product Id: {product_id_text}</p>
        <p class="text-blue-600-700 text-base">Order Type: {order_type_text}</p>
        {#if order_type_text === 'LIMIT'}
          <p class="text-base text-gray-700">Limit Price: {limit_price}</p>
        {/if}
      </div>
      <CodeSnippet type="multi" wrapText="true" expanded="true"
        >{previewPayload}</CodeSnippet
      >
    </div>
  </Modal>
  <Form
    style="max-width: 400px;"
    on:submit={handleSubmit}
    class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
  >
    <h3>Place Order</h3>
    <br />
    <TextInput
      bind:value={orderSize}
      labelText="Order Size"
      placeholder="Enter your order size..."
      invalid={formValid === false}
    /><br />

    <Dropdown
      bind:selectedIndex={side}
      required
      items={side_items}
      titleText="Side"
      placeholder="transaction side"
    /><br />
    <Dropdown
      bind:selectedIndex={product_id}
      titleText="Product Id"
      placeholder="transaction side"
      required
      items={product_id_items}
    /><br />
    <Dropdown
      bind:selectedIndex={order_type}
      titleText="Order Type"
      placeholder="Order Type placeholder"
      required
      items={order_type_items}
    /><br />
    {#if order_type_text === 'LIMIT'}
      <TextInput
        bind:value={limit_price}
        labelText="limit Price"
        placeholder="limit price"
        type="number"
      /> <br />
      <Checkbox
        labelText="Do you want to Iceberg Trade?"
        placeholder="IcebBerg"
        type="checkbox"
        bind:checked={iceberg}
      /> <br />

      <Dropdown
        bind:selectedIndex={time_in_force_type}
        titleText="time_in_force Type"
        placeholder="time_in_force Typer"
        required
        items={time_in_force_items}
      /><br />
      {#if iceberg}
        <TextInput
          bind:value={display_base_size}
          labelText="Display Base Size"
          placeholder="display_base_size"
          type="display_base_size"
        /> <br />
      {/if}
      {#if time_in_force_type === '0'}
        <TextInput
          bind:value={expiry_time}
          labelText="expiry_time"
          placeholder="expiry_time"
          type="expiry_time"
        /> <br />
      {/if}
    {:else if order_type_text === 'TWAP'}
      <TextInput
        bind:value={limit_price}
        labelText="limit Price"
        placeholder="limit price"
        type="number"
      /> <br />
      <TextInput
        bind:value={start_time}
        labelText="start_time"
        placeholder="start_time"
        type="start_time"
      /> <br />
      <TextInput
        bind:value={expiry_time}
        labelText="expiry_time"
        placeholder="expiry_time"
        type="expiry_time"
      /> <br />
    {/if}
    <Button type="submit" style="background: #2c2c2c">Submit</Button>
  </Form>

  <br />
</Content>
