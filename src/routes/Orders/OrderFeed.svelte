<script>
  import { getOrdersSignature } from '../../apis/CoinbaseAuth';
  import { onMount } from 'svelte';
  import { Tile, CodeSnippet, Content } from 'carbon-components-svelte';
  import { fetchStore } from '../../stores/userSession-store';

  let ordersResponse;

  const products = 'BTC-USD';

  onMount(async () => {
    const currentEnvironment = await fetchStore();

    const signature = await getOrdersSignature(
      'orders',
      currentEnvironment.sender_comp_id,
      currentEnvironment.portfolioId,
      [products]
    );
    let orders;
    const socket = new WebSocket(currentEnvironment.websocketUrl);

    //subscribe to channel
    socket.onopen = function () {
      const payload = {
        type: 'subscribe',
        channel: 'orders',
        access_key: `${signature.authResponse.accessKey}`,
        api_key_id: `${signature.authResponse.SVCAccountId}`,
        passphrase: `${signature.authResponse.passphrase}`,
        portfolio_id: currentEnvironment.portfolioId,
        product_ids: signature.authResponse.product_ids,
        signature: `${signature.authResponse.signature}`,
        timestamp: `${signature.authResponse.timestamp}`,
      };

      socket.send(JSON.stringify(payload));
    };

    // Listen for messages

    socket.onmessage = function (event) {
      orders = JSON.parse(event.data);
      ordersResponse = JSON.stringify(orders);
    };
  });
</script>

<Content class="Layout">
  <Tile expanded="true">
    <h3>Order Details:</h3>
    <CodeSnippet
      type="multi"
      showMoreText="Show more"
      wrapText="true"
      expanded="true"
      style="height: 650px;"
    >
      {ordersResponse}
    </CodeSnippet>
  </Tile><br />
</Content>
