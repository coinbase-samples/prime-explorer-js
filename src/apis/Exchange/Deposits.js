import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';
//import { getAccounts } from '../../apis/Exchange/coinbase-accounts';

export const DepositToExchangeAccount = async (
  amount,
  profile_id,
  currency,
  coinbase_account_id
) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/deposits/coinbase-account`;

  const body = {
    amount,
    profile_id,
    currency,
    coinbase_account_id,
  };
  const payload = JSON.stringify(body);
  const path = `/deposits/coinbase-account`;
  try {
    const withDrawToBank = await makeCall('POST', url, path, payload);

    const response = await withDrawToBank.json();
    return response;
  } catch (e) {
    return e;
  }
};
