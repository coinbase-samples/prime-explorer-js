import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const WithdrawToCoinbaseAccount = async (
  amount,
  currency,
  coinbase_account_id
) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/withdrawals/coinbase-account/`;

  const body = {
    amount,
    currency,
    coinbase_account_id,
  };

  const payload = JSON.stringify(body);
  const path = '/withdrawals/coinbase-account/';

  try {
    const withDrawToCBAccount = await makeCall('POST', url, path, payload);

    const response = await withDrawToCBAccount.json();

    return response;
  } catch (e) {
    return e;
  }
};

export const WithdrawToPaymentMethod = async (
  amount,
  currency,
  payment_method_id
) => {
  const { port, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/exchange/withdrawals/payment-method`;

  const body = {
    amount,
    currency,
    payment_method_id,
  };

  const payload = JSON.stringify(body);
  const path = `/withdrawals/payment-method`;
  try {
    const withDrawToBank = await makeCall('POST', url, path, payload);

    const response = await withDrawToBank.json();
    return response;
  } catch (e) {
    return e;
  }
};
