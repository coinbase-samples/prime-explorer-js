<script>
  import { navigate } from 'svelte-routing';
  import Nav from '../../Nav.svelte';
  import { getOrders } from '../../apis/Orders';
  import { createAllocation } from '../../apis/Allocations';
  import { generateQueryparams } from '../../utils/queryParams';
  import {
    Content,
    Button,
    MultiSelect, 
  } from 'carbon-components-svelte';
  import { getStartDate } from '../../utils/constants';

  
  let orders = [];
  let orderList;
  let payload = [];
  let selectedIds = [];
  let showOrdersSelect = false;
  let showOrdersSideSelect = false;

  let selectedAsset;
  let selectedSide;



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
  
 const startDate = getStartDate(3);
  
  const alertPrompt = (result) => {
    alert('Allocation initiated', result);
     navigate('/Orders/Allocations');
  }

  const handleAssetSelect = async () => {
  
  const queryParams=  {
    start_date: startDate,
    product_ids: selectedAsset,
    order_side: selectedSide,

};
    await generateOrdersList(queryParams);
    showOrdersSelect = true;
    showOrdersSideSelect = true;
  };

  const executeAllocation = async () => {
    // Loop through selectedIds array and retrieve text value for each selected item
    const selectedItems = selectedIds.map(id => {
      return payload.find(item => item.id === id).text;
    });

    const result = await createAllocation(selectedAsset, selectedItems, "PERCENT");
    alertPrompt(result)

  };
</script>

<Nav />
<Content class="Layout">
  <label 
    class="mb-2 block text-sm font-bold text-gray-700"
    for="choose-asset"><b>Side:</b></label>
    <br />
  <select
  id="choose-side" 
  name="choose-side"
  class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
  bind:value={selectedSide}
>
  <option value="ss">Choose Order Side</option>
  <option value="BUY">BUY</option>
  <option value="SELL">SELL</option>
</select>

<br />
  <label 
    class="mb-2 block text-sm font-bold text-gray-700"
    for="choose-asset"><b>Asset:</b></label>
    <br />
  <select
     id="choose-asset" 
     name="choose-asset"
     class="focus:outline-none focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
     bind:value={selectedAsset} 
     on:change={handleAssetSelect}>
  <option value="">Choose Asset</option>
  <option value="BTC-USD">BTC-USD</option>
  <option value="ETH-USD">ETH-USD</option>
  <option value="SOL-USD">SOL-USD</option>
  <option value="MATIC-USD">MATIC-USD</option>

</select>
  {#if showOrdersSelect && showOrdersSideSelect}
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
