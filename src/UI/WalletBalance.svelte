<script>
  import { getWalletBalance } from '../apis/Wallets';
  import { onMount } from 'svelte';
  import { Button, Modal } from 'carbon-components-svelte';

  export let walletId;
  let walletBalanceDetails;
  let isModalOpen = false;
  let modalState = 'preview';
  let modalProps = {};

  onMount(async () => {
    walletBalanceDetails = await getWalletBalance(walletId);
  });

  const stakeClicked = () => {
    console.log('Stake clicked');
  };

  const unstakeClicked = () => {
    isModalOpen = true;
    modalProps = {
      heading: `Unstake ${walletBalanceDetails.balance.amount}`,
      type: 'unstake',
      description: `Would you like to unstake your ${walletBalanceDetails.balance.bonded_amount} amount?`,
    };
  };

  const restakeClicked = () => {
    isModalOpen = true;
    modalProps = {
      heading: 'Restake Rewards',
      type: 'restake',
      description: `Would you like to restake your ${walletBalanceDetails.balance.pending_rewards_amount} rewards amount?`,
    };
  };

  const executeRestake = () => {
    console.log('Restake executed');
    modalState = 'response';
    modalProps = {
      heading: 'Restake Rewards Response',
      type: 'restake',
      description: 'Status: Success',
    };

  };

  const closeModal = () => {
    isModalOpen = false;
  };
</script>

{#if walletBalanceDetails && walletBalanceDetails.balance}
  <h4>Balance Amount: {walletBalanceDetails.balance.amount}</h4>
  <h4>Bonded Amount: {walletBalanceDetails.balance.bonded_amount}</h4>
  <h4>Reserved Amount: {walletBalanceDetails.balance.reserved_amount}</h4>
  <h4>Unbonded Amount: {walletBalanceDetails.balance.unbonding_amount}</h4>
  <h4>Unvested Amount: {walletBalanceDetails.balance.unvested_amount}</h4>
  <h4>Rewards Amount: {walletBalanceDetails.balance.pending_rewards_amount}</h4>
  <h4>Past Rewards Amount: {walletBalanceDetails.balance.past_rewards_amount}</h4>

  {#if walletBalanceDetails.balance.bonded_amount > 0}
    <Button size="small" on:click={unstakeClicked}>Unstake</Button>
    {#if walletBalanceDetails.balance.pending_rewards_amount > 0}
      <Button size="small" on:click={restakeClicked}>Restake Rewards</Button>
    {/if}
  {:else}
    <Button size="small" on:click={stakeClicked}>Stake</Button>
  {/if}

  {#if modalState === 'preview'}
    <Modal
      bind:open={isModalOpen}
      on:close={closeModal}
      modalHeading={modalProps.heading}
      primaryButtonText="Confirm {modalProps.type}"
      secondaryButtonText="Cancel"
      on:click:button--secondary={() => (isModalOpen = false)}
      on:open
      on:close
      on:submit={executeRestake}
    >
      <p>{modalProps.description}</p>
    </Modal>
  {/if}

  {#if modalState === 'response'}
    <Modal
      bind:open={isModalOpen}
      on:close={closeModal}
      primaryButtonText="Close"
      modalHeading={modalProps.heading}
      on:open
      on:close
      on:submit={closeModal}

    >
      <p>{modalProps.description}</p>
    </Modal>
  {/if}

  <br /><br>
{/if}
