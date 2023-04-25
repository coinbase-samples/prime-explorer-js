<script>
  import { navigate } from 'svelte-routing';
  import Nav from '../../Nav.svelte';
  import { onMount } from 'svelte';
  import { getOrders } from '../../apis/Orders';
  import { createAllocation } from '../../apis/CreateAllocation'
  import {
    Content,
    Form,
    Button,
    MultiSelect, 
    TextArea
  } from 'carbon-components-svelte';

  let accountId = "";
  let productId = "";
  let amount = 0;
  let orders = [];
  let orderList;
  let payload = [];
  let selectedIds = [];

  onMount(async () => {
    orders = await getOrders('&start_date=2023-03-05T00:00:01Z&product_ids=ETH-USD');
    orderList = orders.orders.slice(0, 10);
    console.log(orderList);
    // Modify payload to include both id and text properties
    payload = orderList.map((item, index) => {
      return {
        id: index,
        text: item.id, // Include both id and description
      };
    });
  });

  const alertPrompt = (result) => {
    alert('Allocation initiated', result);
     navigate('/Orders/Allocations');
  }

  const executeAllocation = async () => {
    // Loop through selectedIds array and retrieve text value for each selected item
    const selectedItems = await selectedIds.map(id => {
      return payload.find(item => item.id === id).text;
    });

    console.log(selectedItems);
    const result = await createAllocation(selectedItems, "BASE");
    alertPrompt(result)

  };
</script>

<Nav />
<Content class="Layout">
  <MultiSelect
    size="xl"
    label="Select Orders to Allocate"
    items={payload}
    bind:selectedIds
    onchange={e => (selectedIds = e.detail.value)}
  />

 
    <br />
    <Button on:click={executeAllocation}>Allocate</Button>
 
</Content>
