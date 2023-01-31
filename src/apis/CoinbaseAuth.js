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
import CryptoJS from 'crypto-es';
import { fetchStore } from '../stores/userSession-store';

// Function to generate a signature using Google's crypto-js package
function sign(strToSign, signingKey) {
  const hash = CryptoJS.HmacSHA256(strToSign, signingKey);
  return hash.toString(CryptoJS.enc.Base64);
}

// Function to build the payload required to sign
// function buildPayload(ts, method, requestPath, body) {
const generatePayload = (
  channel,
  accessKey,
  SVCAccountId,
  timeISO,
  portfolioId,
  product_ids
) => {
  if (product_ids) {
    return `${channel}${accessKey}${SVCAccountId}${timeISO}${portfolioId}${product_ids}`;
  }
  return `${channel}${accessKey}${SVCAccountId}${timeISO}${portfolioId}`;
};

export const getSocketSignature = async (channel, SVCAccountId, products) => {
  const { accessKey, passphrase, signingKey } = await fetchStore();
  const now = new Date(new Date().toUTCString());
  const timeISO = `${now.toISOString().split('.')[0]}Z`;

  const strToSign = generatePayload(
    channel,
    accessKey,
    SVCAccountId,
    timeISO,
    '',
    products
  );

  // Sign it!
  const sig = sign(strToSign, signingKey);

  return {
    authResponse: {
      channel,
      signature: sig,
      timestamp: timeISO,
      accessKey,
      SVCAccountId,
      passphrase,
    },
  };
};

export const getOrdersSignature = async (
  channel,
  SVCAccountId,
  portfolioId,
  product_ids
) => {
  const { accessKey, passphrase, signingKey } = await fetchStore();
  const now = new Date(new Date().toUTCString());
  const timeISO = `${now.toISOString().split('.')[0]}Z`;

  // Build the string we want to sign using information defined above
  const strToSign = generatePayload(
    channel,
    accessKey,
    SVCAccountId,
    timeISO,
    portfolioId,
    product_ids
  );

  // Sign it!
  const sig = sign(strToSign, signingKey);
  return {
    authResponse: {
      channel,
      signature: sig,
      timestamp: timeISO,
      accessKey,
      SVCAccountId,
      passphrase,
      product_ids,
    },
  };
};
