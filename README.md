---

# Prime Explorer

This application provides sample code that showcases the [Coinbase Prime APIs](https://docs.cloud.coinbase.com/prime/docs#introduction). The example UI interacts with both the REST and WebSocket endpoints.

The application was built using [Svelte](https://svelte.dev/), [Carbon Design System](https://carbondesignsystem.com/), and [TailWind CSS](https://tailwindcss.com/).

Requires [Node.js](https://nodejs.org) 16.x+

## Clone the repo

```bash
git clone git@github.com:coinbase-samples/prime-explorer-js.git
```

## Getting started

Init via npm:

```bash
cd prime-explorer-js
npm install
```

## Access credentials

Navigate to the Prime Settings page and pull the API credentials:
```bash
https://prime.coinbase.com/portfolio/{your_portfolio_id}/settings/address-book
```

Optionally, access Exchange credentials (sandbox or prod):

```bash
https://public.sandbox.exchange.coinbase.com/profile/api
````

## Set environment variables

Add the following environment variables to a .env file in base of the repository:

```bash
PROD_SVC_ACCOUNTID=YOUR_SENDER_COMP_ID
PROD_ACCESS_KEY=YOUR_ACCESS_KEY
PROD_PORTFOLIO_ID=YOUR_PORTFOLIO_ID
PROD_PASSPHRASE=YOUR_PASSPHRASE
PROD_SIGNING_KEY=YOUR_SIGNING_KEY
PROD_URL=wss://ws-feed.prime.coinbase.com
PROD_API_HOST=https://api.prime.coinbase.com
PORT=YOUR_PORT
HTTP_HOST=http://localhost
ENTITY_ID=YOUR_ENTITY_ID
```
Validate the values contained in the .env file:

```bash
 source .env
 echo $PROD_SVC_ACCOUNTID
```

*Optional*

To test a partial list of the [Coinbase Exchange](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccounts) endpoints, add the following to the .env file:

```bash
EXCHANGE_PROD_ACCESS_KEY=YOUR_ACCESS_KEY
EXCHANGE_PROD_PASSPHRASE=YOUR_PASSPHRASE
EXCHANGE_PROD_SIGNING_KEY=YOUR_SIGNING_KEY
```

## Run the application

```bash
npm run dev
```

Navigate to [localhost:{{yourPort}}](http://localhost:{{yourPort}}). You should see the app running.


## Generate a build

```bash
npm run build
```
