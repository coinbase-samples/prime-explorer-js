<script>
  import { navigate } from 'svelte-routing';
  import Nav from '../../Nav.svelte';
  import { getAllPortfolios } from '../../apis/Portfolio';
  import { getOrders } from '../../apis/Orders';
  import { createAllocation } from '../../apis/Allocations';
  import { generateQueryparams } from '../../utils/queryParams';
  import { Content, Button, MultiSelect } from 'carbon-components-svelte';
  import { getStartDate } from '../../utils/constants';

  let orders = [];
  let orderList;
  let payload = [];
  let showOrdersSelect = false;
  let showOrdersSideSelect = false;
  let showPortfoliosSelect = false;
  let portfolios = [];
  let portfoliosList = [];
  let selectedAsset;
  let selectedSide;
  let selectedOrderIds = [];
  let selectedPortfolioIds;

  const getPortfolioList = async () => {
    portfolios = await getAllPortfolios();
    portfoliosList = portfolios.map((item, index) => {
      return {
        id: index,
        text: item.id, // Include both id and description
      };
    });
  };

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
  };

  const handleAssetSelect = async () => {
    const queryParams = {
      start_date: startDate,
      product_ids: selectedAsset,
      order_side: selectedSide,
    };
    await generateOrdersList(queryParams);
    await getPortfolioList();

    showOrdersSelect = true;
    showOrdersSideSelect = true;
    showPortfoliosSelect = true;
  };

  const executeAllocation = async () => {
    if (!selectedPortfolioIds || selectedPortfolioIds.length === 0) {
      console.error('No portfolios selected');
      return;
    }

    const selectedOrderItems = selectedOrderIds.map((id) => {
      return payload.find((item) => item.id === id).text;
    });

    const selectedPortIds = selectedPortfolioIds.map((id) => {
      return portfoliosList.find((item) => item.id === id).text;
    });
    const result = await createAllocation(
      selectedAsset,
      selectedOrderItems,
      'PERCENT',
      selectedPortIds
    );
    alertPrompt(result);
  };
</script>

<Nav />
<Content class="Layout">
  <label class="mb-2 block text-sm font-bold text-gray-700" for="choose-asset"
    ><b>Side:</b></label
  >
  <br />
  <select
    id="choose-side"
    name="choose-side"
    class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
    bind:value={selectedSide}
  >
    <option value="">Choose Order Side</option>
    <option value="BUY">BUY</option>
    <option value="SELL">SELL</option>
  </select>

  <br />
  <label class="mb-2 block text-sm font-bold text-gray-700" for="choose-asset"
    ><b>Asset:</b></label
  >
  <br />
  <select
    id="choose-asset"
    name="choose-asset"
    class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
    bind:value={selectedAsset}
    on:change={handleAssetSelect}
  >
    <option value="">Choose Asset</option>
    <option value="BTC-USD">BTC-USD</option>
    <option value="ETH-USD">ETH-USD</option>
    <option value="SOL-USD">SOL-USD</option>
    <option value="MATIC-USD">MATIC-USD</option>
    <option value="DOGE-USD">DOGE-USD</option>
  </select>

  <MultiSelect
    size="xl"
    label="Select Portfolios to Allocate to"
    items={portfoliosList}
    bind:selectedIds={selectedPortfolioIds}
    on:change={(e) => {
      selectedPortfolioIds = e.detail.value;
    }}
  />

  <br />
  {#if showOrdersSelect && showOrdersSideSelect}
    <MultiSelect
      size="xl"
      label="Select Orders to Allocate"
      items={payload}
      bind:selectedIds={selectedOrderIds}
      on:change={(e) => {
        selectedOrderIds = e.detail.value;
      }}
    />
  {/if}
  <br />

  <Button on:click={executeAllocation}>Allocate</Button>
</Content>
