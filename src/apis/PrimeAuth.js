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
import CryptoJS from 'crypto-es';
import { fetchStore } from '../stores/userSession-store';

// Function to generate a signature using Google's crypto-js package
function sign(str, secret) {
  const hash = CryptoJS.HmacSHA256(str, secret);
  return hash.toString(CryptoJS.enc.Base64);
}

// Function to build the payload required to sign
function buildPayload(ts, method, requestPath, body) {
  return `${ts}${method}${requestPath}${body}`;
}

export const getSignature = async (method, requestPath, body) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const { accessKey, passphrase, signingKey } = await fetchStore();

  // Build the string we want to sign using information defined above
  const strToSign = buildPayload(timestamp, method, requestPath, body);

  // Sign it!
  const sig = sign(strToSign, signingKey);

  return {
    authResponse: {
      signature: sig,
      timestamp,
      signingKey,
      passphrase,
      access_key: accessKey,
    },
  };
};
