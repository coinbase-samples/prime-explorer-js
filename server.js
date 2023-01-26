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

require('dotenv').config();

const express = require('express');
const proxy = require('express-http-proxy');
const PORT = process.env.PORT;

const myPrimeProxy = proxy('https://api.prime.coinbase.com', {
  proxyReqPathResolver: (req) => req.originalUrl.replace('/api', ''),
});

const myOauthProxy = proxy('https://api.coinbase.com', {
  proxyReqPathResolver: (req) => req.originalUrl.replace('/oauthAPI', '/oauth'),
});

const myUserProxy = proxy('https://api.coinbase.com', {
  proxyReqPathResolver: (req) => req.originalUrl.replace('/user', ''),
});

const myAnalyticsProxy = proxy('https://app.analytics.coinbase.com', {
  proxyReqPathResolver: (req) => req.originalUrl.replace('/analytics', '/api'),
});

//https://api-public.sandbox.exchange.coinbase.com
const myExchangeProxy = proxy('https://api.exchange.coinbase.com', {
  proxyReqPathResolver: (req) => req.originalUrl.replace('/api/exchange', ''),
});

const app = express();
const port = process.env.PORT || PORT;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use('/api/exchange', myExchangeProxy);
app.use('/api', myPrimeProxy);
app.use('/oauthAPI', myOauthProxy);
app.use('/user', myUserProxy);
app.use('/analytics', myAnalyticsProxy);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

//use /api pattern for each api request.

app.listen(port, () => {});
