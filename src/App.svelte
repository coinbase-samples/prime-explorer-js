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

  import 'carbon-components-svelte/css/white.css';
  import Orders from './routes/Orders/Orders.svelte';
  import OrderId from './routes/Orders/OrderId.svelte';
  import OrderFeed from './routes/Orders/OrderFeed.svelte';
  import Allocations from './routes/Orders/Allocations.svelte';
  import Nav from './Nav.svelte';
  import { Router, Route } from 'svelte-routing';
  import PlaceOrder from './routes/Orders/PlaceOrder.svelte';
  import CreateTransfer from './routes/Transactions/CreateTransfer.svelte';
  import CreateWithdrawal from './routes/Transactions/CreateWithdrawal.svelte';
  import Landing from './routes/Landing.svelte';
  import Products from './routes/Products.svelte';
  import Users from './routes/Users.svelte';
  import Transactions from './routes/Transactions.svelte';
  import TransactionId from './routes/TransactionId.svelte';
  import MarketData from './routes/MarketData.svelte';
  import Wallets from './routes/Wallets/Wallets.svelte';
  import WalletId from './routes/Wallets/WalletId.svelte';
  import Exchange from './routes/Exchange/Exchange.svelte';
  import ExchangeOrders from './routes/Exchange/Orders/ExchangeOrders.svelte';
  import ExchangeOrderId from './routes/Exchange/Orders/ExchangeOrderId.svelte';
  import PlaceExchangeOrder from './routes/Exchange/Orders/PlaceExchangeOrder.svelte';
  import Withdrawals from './routes/Exchange/Withdrawals.svelte';
  import WithdrawToPaymentMethod from './routes/Exchange/WithdrawToPaymentMethod.svelte';
  import DepositToPaymentMethod from './routes/Exchange/DepositToPaymentMethod.svelte';
  import CreateWallet from './routes/Wallets/CreateWallet.svelte';
  import ConvertCurrency from './routes/Exchange/ConvertCurrency.svelte';
  import Currencies from './routes/Exchange/Currencies.svelte';
  import CurrencyId from './routes/Exchange/CurrencyId.svelte';
  import Activities from './routes/Activities.svelte';
  import ActivityId from './routes/ActivityId.svelte';
  import Addresses from './routes/Addresses.svelte';
  import CreateConversion from './routes/Transactions/CreateConversion.svelte';
  import Transfers from './routes/Exchange/Transfers.svelte';
  import PaymentMethods from './routes/Exchange/PaymentMethods.svelte';
  import CreateAllocation from './routes/Orders/CreateAllocation.svelte';
  import AllocationId from './routes/Orders/AllocationId.svelte';


  const url = '';
</script>

<Nav />
<Router {url}>
  <Route path="/" component={Landing} />
  <Route path="/landing" component={Landing} />
  <Route path="Orders" component={Orders} />
  <Route path="/Orders/:orderId" component={OrderId} />
  <Route path="/Orders/Feed" component={OrderFeed} />
  <Route path="/Orders/Allocations" component={Allocations} />
  <Route path="/Orders/Allocations/:allocationId" component={AllocationId} />
  <Route path="/Orders/Create" component={PlaceOrder} orderForm="true" />
  <Route path="/Orders/Allocate" component={CreateAllocation} />
  <Route path="/Products" component={Products} />
  <Route path="/Users" component={Users} />
  <Route path="/Transactions" component={Transactions} />
  <Route path="/Transactions/:transactionId" component={TransactionId} />
  <Route path="/Transactions/transfers/create" component={CreateTransfer} />
  <Route path="/Transactions/withdrawals/create" component={CreateWithdrawal} />
  <Route path="/Transactions/conversions/create" component={CreateConversion} />
  <Route path="/Addresses" component={Addresses} />
  <Route path="/MarketData" component={MarketData} />
  <Route path="/Wallets" component={Wallets} />
  <Route path="/Wallets/:walletId" component={WalletId} />
  <Route path="/Wallets/Create" component={CreateWallet} orderForm="true" />
  <Route path="/Activities" component={Activities} />
  <Route path="/Activities/:activityId" component={ActivityId} />
  <Route path="/Exchange" exact component={Exchange} />
  <Route path="/Exchange/Orders" exact component={ExchangeOrders} />
  <Route path="/Exchange/Orders/:orderId" exact component={ExchangeOrderId} />
  <Route
    path="/Exchange/Orders/Create"
    exact
    component={PlaceExchangeOrder}
  />
  <Route path="/Exchange/Withdrawals" exact component={Withdrawals} />
  <Route
    path="/Exchange/WithdrawToPaymentMethod"
    exact
    component={WithdrawToPaymentMethod}
  />
  <Route
    path="/Exchange/DepositToPaymentMethod"
    exact
    component={DepositToPaymentMethod}
  />
  <Route path="/Exchange/ConvertCurrency" exact component={ConvertCurrency} />
  <Route path="/Exchange/Currencies" exact component={Currencies} />
    <Route path="/Exchange/Payments" exact component={PaymentMethods} />

  <Route path="/Exchange/Transfers" exact component={Transfers} />
  <Route path="/Exchange/Currencies/:currencyId" component={CurrencyId} />
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
