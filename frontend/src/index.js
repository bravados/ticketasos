import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getConfig from "./config.js";
import * as nearAPI from "near-api-js";

// Initializing contract
async function initContracts() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const nftContract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.nftContractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ["nft_tokens"],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ["new_default_meta", "nft_mint_and_approve"],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: walletConnection.getAccountId(),
    }
  );

  // Initializing our contract APIs by contract name and configuration
  const marketContract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.marketContractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ["get_sales_by_nft_contract_id"],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ["offer"],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: walletConnection.getAccountId(),
    }
  );

  return {
    nftContract,
    marketContract,
    currentUser,
    nearConfig,
    walletConnection,
  };
}

window.nearInitPromise = initContracts()
  .then(
    ({
      nftContract,
      marketContract,
      currentUser,
      nearConfig,
      walletConnection,
    }) => {
      ReactDOM.render(
        <App
          nftContract={nftContract}
          marketContract={marketContract}
          currentUser={currentUser}
          nearConfig={nearConfig}
          wallet={walletConnection}
        />,
        document.getElementById("root")
      );
    }
  )
  .catch((error) => console.log(error));
