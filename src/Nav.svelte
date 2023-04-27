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
  import { navigate } from 'svelte-routing';
  import {
    Header,
    HeaderNav,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
  } from 'carbon-components-svelte';

  let isSideNavOpen = false;

  const routeTo = (event, href) => {
    event.preventDefault();
    navigate(href);
  };
</script>

<Header
  company="Coin Trader"
  bind:isSideNavOpen
  href="/"
  on:click={(event) => routeTo(event, '/')}
  style="background: #1554f0"
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderNav style="background: #1554f0" />
</Header>

<SideNav bind:isOpen={isSideNavOpen} style="width: 10rem;">
  <SideNavItems class="fixed z-30 w-full border-b border-gray-200 bg-white">
    <SideNavMenu text="Orders">
      <SideNavMenuItem
        href="/Orders"
        text="Orders"
        on:click={(event) => routeTo(event, '/Orders')}
      />
      <SideNavMenuItem
        href="/Orders/Feed"
        text="Order Feed"
        on:click={(event) => routeTo(event, '/Orders/Feed')}
      />
      <SideNavMenuItem
        href="/Orders/Create"
        text="Place Order"
        on:click={(event) => routeTo(event, '/Orders/Create')}
      />
      <SideNavMenuItem
        href="/Orders/Allocations"
        text="Orders Allocated"
        on:click={(event) => routeTo(event, '/Orders/Allocations')}
      />
        <SideNavMenuItem
        href="/Orders/CreateAllocation"
        text="Create Allocation"
        on:click={(event) => routeTo(event, '/Orders/Allocate')}
      />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavMenu text="Transactions">
      <SideNavMenuItem
        href="/Transactions"
        text="Transactions"
        on:click={(event) => routeTo(event, '/Transactions')}
      />
      <SideNavMenuItem
        href="/Transactions/transfers/create"
        text="Create Transfer"
        on:click={(event) => routeTo(event, '/Transactions/transfers/create')}
      />
      <SideNavMenuItem
        href="/Transactions/withdrawals/create"
        text="Create Withdrawal"
        on:click={(event) => routeTo(event, '/Transactions/withdrawals/create')}
      />
      <SideNavMenuItem
        href="/Transactions/conversions/create"
        text="Create Conversion"
        on:click={(event) => routeTo(event, '/Transactions/conversions/create')}
      />
      <SideNavMenuItem
        href="/Addresses"
        text="Addresses"
        on:click={(event) => routeTo(event, '/Addresses')}
      />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavMenu text="Activities">
      <SideNavMenuItem
        href="/Activities"
        text="Activities"
        on:click={(event) => routeTo(event, '/Activities')}
      />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink
      text="Market Data"
      href="/MarketData"
      on:click={(event) => routeTo(event, '/MarketData')}
    />
    <SideNavDivider />
    <SideNavMenu text="Wallets">
      <SideNavLink
        text="Wallets"
        href="/Wallets"
        on:click={(event) => routeTo(event, '/Wallets')}
      />
      <SideNavMenuItem
        href="/Wallets/Create"
        text="Create Wallet"
        on:click={(event) => routeTo(event, '/Wallets/Create')}
      />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavMenu text="Exchange">
      <SideNavMenuItem
        text="Exchange"
        href="/Exchange"
        on:click={(event) => routeTo(event, '/Exchange')}
      />
       <SideNavMenuItem
        text="Orders"
        href="/Exchange/Orders"
        on:click={(event) => routeTo(event, '/Exchange/Orders')}
      />
      <SideNavMenuItem
        text="Place Order"
        href="/Exchange/Orders/Create"
        on:click={(event) => routeTo(event, '/Exchange/Orders/Create')}
      />
      <SideNavMenuItem
        href="/Exchange/Withdrawals"
        text="Withdrawals"
        on:click={(event) => routeTo(event, '/Exchange/Withdrawals')}
      />
      <SideNavMenuItem
        href="/Exchange/WithdrawToPaymentMethod"
        text="WithdrawToPaymentMethod"
        on:click={(event) =>
          routeTo(event, '/Exchange/WithdrawToPaymentMethod')}
      />
       <SideNavMenuItem
        href="/Exchange/DepositToPaymentMethod"
        text="DepositToPaymentMethod"
        on:click={(event) =>
          routeTo(event, '/Exchange/DepositToPaymentMethod')}
      />
      <SideNavMenuItem
        href="/Exchange/ConvertCurrency"
        text="ConvertCurrency"
        on:click={(event) => routeTo(event, '/Exchange/ConvertCurrency')}
      />
      <SideNavMenuItem
        href="/Exchange/Currencies"
        text="Currencies"
        on:click={(event) => routeTo(event, '/Exchange/Currencies')}
      />
      <SideNavMenuItem
        href="/Exchange/Payments"
        text="Payments"
        on:click={(event) => routeTo(event, '/Exchange/Payments')}
      />
      <SideNavMenuItem
      href="/Exchange/Transfers"
      text="Transfers"
      on:click={(event) => routeTo(event, '/Exchange/Transfers')}
    />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink
      text="Products"
      href="/Products"
      on:click={(event) => routeTo(event, '/Products')}
    />
    <SideNavDivider />
    <SideNavLink
      text="Users"
      href="/Users"
      on:click={(event) => routeTo(event, '/Users')}
    />
    <SideNavDivider />
  </SideNavItems>
</SideNav>

<style>
</style>
