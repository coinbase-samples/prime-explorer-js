<script>
  import { getWalletBalance } from '../apis/Wallets';
  import { onMount } from 'svelte';
  import { Button, Modal, Loading } from 'carbon-components-svelte';
  import { restake, initiateStake, unstake } from '../apis/Wallets';

  export let walletId;
  let walletBalanceDetails;
  let isModalOpen = false;
  let modalState = 'preview';
  let modalProps = {};
  let stakingStatus = 'loading';
  let loadingStakeResponse = false
  let stakeResponse;


  onMount(async () => {
    walletBalanceDetails = await getWalletBalance(walletId);
  });

  const stakeClicked = () => {
    console.log('Stake clicked');
    isModalOpen = true;
    modalProps = {
      heading: 'Stake Your asset',
      type: 'stake',
      description: `Would you like to stake your ${walletBalanceDetails.balance.amount} amount?`,
    };
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

  const executeStake = async (type) => {
    console.log('executeStake', type);
    loadingStakeResponse = true;
    switch (type) {
  case 'stake':
    stakeResponse = await initiateStake(walletId, 'beefKGBWeSpHzYBHZXwp5So7wdQGX6mu4ZHCsH3uTar');
    break;
  case 'unstake':
    stakeResponse = await unstake(walletId);
    break;
  case 'restake':
    stakeResponse = await restake(walletId);
    break;
  default:
    // Handle the default case here if needed
    break;
}
    loadingStakeResponse = false;
    if (stakeResponse.activity_id) {
      stakingStatus = `Success. Your wallet has been ${type}d. Here is your activity id: ${stakeResponse.activity_id}`
    } else {
      stakingStatus = `Failed. Your rewards have not been restaked. Reason: ${stakeResponse.message}`;
    }
    modalState = 'response';
    modalProps = {
      heading: `${type} Response`,
      type: {type},
      description: `Status: ${stakingStatus}`,
    };
  };

  const closeModal = () => {
    isModalOpen = false;
     modalState = 'preview';

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
      on:submit={executeStake(modalProps.type)}
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
    {#if loadingStakeResponse}
      <Loading />
    {:else}
      <p>{modalProps.description}</p>
    {/if}
    </Modal>
  {/if}

  <br /><br>
{/if}
