<script>
  import { getWalletBalance } from '../apis/Wallets';
  import { onMount } from 'svelte';
  import { Button } from 'carbon-components-svelte';

  export let walletId;
  let walletBalanceDetails;

  onMount(async () => {
    walletBalanceDetails = await getWalletBalance(walletId);
  });

  const stakeClicked = () => {
    console.log('Stake clicked');
  };

  const unstakeClicked = () => {
    console.log('Unstake clicked');
  };

  const restakeClicked = () => {
    console.log('Restake clicked');
  };
</script>

{#if walletBalanceDetails && walletBalanceDetails.balance}
  <h4>Balance Amount: {walletBalanceDetails.balance.amount}</h4>
  <h4>Bonded Amount: {walletBalanceDetails.balance.bonded_amount}</h4>
  <h4>Reserved Amount: {walletBalanceDetails.balance.reserved_amount}</h4>
  <h4>Unbonded Amount: {walletBalanceDetails.balance.unbonding_amount}</h4>
  <h4>Unvested Amount: {walletBalanceDetails.balance.unvested_amount}</h4>
  <h4>Rewards Amount: {walletBalanceDetails.balance.pending_rewards_amount}</h4>
  <h4>Past Rewards Amount: {walletBalanceDetails.balance.past_rewards_amount}</h4><br>

  {#if walletBalanceDetails.balance.bonded_amount > 0}
    <Button size="small" on:click={unstakeClicked}>Unstake</Button>
    <Button size="small" on:click={restakeClicked}>Restake Rewards</Button>
  {:else if walletBalanceDetails.balance.bonded_amount === 0}
    <Button size="small" on:click={stakeClicked}>Stake</Button>
  {/if}

  <br /><br>
{/if}
