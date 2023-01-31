/**
 * Copyright 2023 Coinbase Global, Inc.
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
import { writable } from 'svelte/store';

const defaultEnvironment = {
  environment: 'PRODUCTION',
};

const storeEnvironmentSession = localStorage.environmentSession;

export const userEnvironment = writable(
  storeEnvironmentSession
    ? JSON.parse(storeEnvironmentSession)
    : defaultEnvironment
);
userEnvironment.subscribe(
  (value) => (localStorage.userEnvironment = JSON.stringify(value))
);

export const fetchStore = async () => {
  // eslint-disable-next-line no-undef
  const vars = __myapp;
  let signingKey;
  let apiHost;
  let accessKey;
  let passphrase;
  let portfolioId;
  let svcAccountId;
  let webSocketUrl;
  let port;
  let entityId;
  let httpHost;
  let originWallet;
  let destinationWallet;

  await userEnvironment.subscribe(() => {
    signingKey = vars.env.PROD_SIGNING_KEY;
    accessKey = vars.env.PROD_ACCESS_KEY;
    passphrase = vars.env.PROD_PASSPHRASE;
    portfolioId = vars.env.PROD_PORTFOLIO_ID;
    svcAccountId = vars.env.PROD_SVC_ACCOUNTID;
    webSocketUrl = vars.env.PROD_WEBSOCKET_URL;
    httpHost = vars.env.HTTP_HOST;
    apiHost = vars.env.PROD_API_HOST;
    port = vars.env.PORT;
    entityId = vars.env.ENTITY_ID;
    destinationWallet = vars.env.DESTINATION_WALLET;
    originWallet = vars.env.ORIGIN_WALLET;
  });

  const response = {
    signingKey,
    accessKey,
    passphrase,
    portfolioId,
    websocketUrl: webSocketUrl,
    sender_comp_id: svcAccountId,
    apiHost,
    port,
    enityId: entityId,
    httpHost,
    destinationWallet,
    originWallet,
  };
  return response;
};
