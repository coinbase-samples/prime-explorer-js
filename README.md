
---

# Prime Explorer

This application showcases the all of the Coinbase [Prime APIs](https://docs.cloud.coinbase.com/prime/docs#introduction) to give example UI consuming our REST and Web Socket Interfaces.  The web application was built using the [Svelte Javascript version 3.0](https://svelte.dev/) framework, [Carbon Component UI Kit](https://carbondesignsystem.com/) and [TailWind Css](https://tailwindcss.com/).

```bash

#Clone Repo:

git clone https://github.com/coinbase-samples/prime-explorer-js.git

or using GH CLI gh repo clone https://github.com/coinbase-samples/prime-explorer-js.git

```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Getting started

Once the project is pulled...

```bash
cd /primer-explorer-js
npm install

```
## Grab your Prime and optional Exchange Credentials

Navigate to your Prime Settings and grab your API credentials:
```bash
https://prime.coinbase.com/portfolio/{your_portfolio_id}/settings/address-book 

```

Navigate to your Exchange Settings and grab your API credentials (sandbox or prod):
```bash
https://public.sandbox.exchange.coinbase.com/profile/api
````

## Load environment variables
You will need the following variables saved in an .env file in the root directory.
1) Create a file called '.env' in the root project folder
2) Enter your credentials as follows:

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

3) Now that you've inputted your Prime Variables, run this command in your terminal to verify your env variables are loading properly.

```bash
 source .env
 echo $PROD_SVC_ACCOUNTID
```

***optional**

If you want to test a few of the Coinbase Exchange endpoints in this application, additionally, add the following to your
.env file.

```bash
EXCHANGE_PROD_ACCESS_KEY=YOUR_ACCESS_KEY
EXCHANGE_PROD_PASSPHRASE=YOUR_PASSPHRASE
EXCHANGE_PROD_SIGNING_KEY=YOUR_SIGNING_KEY

```


Start the Project

```bash
npm run dev
```

Navigate to [localhost:{{yourPort}}](http://localhost:{{yourPort}}). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.



## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


