/**
 * Copyright 2022 Coinbase Global, Inc.
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
import { fetchStore } from '../stores/userSession-store';
import { makeCall } from './PrimeClient';

export const getAddressBook = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/address_book?${
    queryParams ? queryParams : 'limit=50'
  }`;

  const path = `/v1/portfolios/${portfolioId}/address_book`;
  try {
    const fetchAddressBook = await makeCall('GET', url, path, '');
    const addressBook = await fetchAddressBook.json();
    return addressBook.addresses;
  } catch (e) {
    return e;
  }
};

export const CreateAllowedAddress = async (
  address,
  name,
  currency_symbol,
  account_identifier
) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const url = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/address_book`;
  const body = {
    address,
    name,
    currency_symbol,
  };
  if (account_identifier) {
    body.account_identifier = account_identifier;
  }

  const payload = JSON.stringify(body);

  try {
    const path = `/v1/portfolios/${portfolioId}/address_book`;
    const CreateAllowedAddressResponsePost = await makeCall(
      'POST',
      url,
      path,
      payload
    );

    const createAllowedAddressResponse =
      await CreateAllowedAddressResponsePost.json();
    return createAllowedAddressResponse;
  } catch (e) {
    return e;
  }
};
