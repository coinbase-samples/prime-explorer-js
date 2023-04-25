<script>
  import { navigate } from 'svelte-routing';
  import Nav from '../../Nav.svelte';
  import { onMount } from 'svelte';
  import { getOrders } from '../../apis/Orders';
  import { createAllocation } from '../../apis/CreateAllocation'
  import { generateQueryparams } from '../../utils/queryParams';
  import {
    Content,
    Form,
    Button,
    MultiSelect, 
    TextArea,
  } from 'carbon-components-svelte';

  
  let orders = [];
  let orderList;
  let payload = [];
  let selectedIds = [];
  let showOrdersSelect = false;
  let selectedAsset;


  // onMount(async () => {

 const generateOrdersList = async (queryParams) => {
   const params = generateQueryparams(queryParams);
    orders = await getOrders(params);
    orderList = orders.orders.slice(0, 10);
    // Modify payload to include both id and text properties
    payload = orderList.map((item, index) => {
      return {
        id: index,
        text: item.id, // Include both id and description
      };
    });
  };
  
  //});

  
  const alertPrompt = (result) => {
    alert('Allocation initiated', result);
     navigate('/Orders/Allocations');
  }

   const handleAssetSelect = async (event) => {
    selectedAsset = event.target.value;
   const payload=  {
  start_date: '2023-03-05T00:00:01Z',
  product_ids: selectedAsset,
};
    await generateOrdersList(payload);
    showOrdersSelect = true;
  };

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

  <label 
    class="mb-2 block text-sm font-bold text-gray-700"
    for="choose-asset"><b>Choose Asset:</b></label>
    <br />
  <select
     id="choose-asset" 
     name="choose-asset"
     class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
     bind:value={selectedAsset} 
     on:change={handleAssetSelect}>
  <option value="">-- Please Choose --</option>
  <option value="BTC-USD">BTC-USD</option>
  <option value="ETH-USD">ETH-USD</option>
</select>
  {#if showOrdersSelect}
  <MultiSelect
    size="xl"
    label="Select Orders to Allocate"
    items={payload}
    bind:selectedIds
    onchange={e => (selectedIds = e.detail.value)}
  />

 
    <br />
    <Button on:click={executeAllocation}>Allocate</Button>
 {/if}
</Content>
