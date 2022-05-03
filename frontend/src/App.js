import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import {v4 as uuidv4} from 'uuid';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, trackerNumber, donation, nftStorageId } = e.target.elements;

    fieldset.disabled = true;

    contract.nft_mint({
      "token_id": uuidv4(),
      "receiver_id": currentUser.accountId,
      "metadata": {
        "title": "New NFT for you from Brandy",
        "description": "My NFT media",
        "media": nftStorageId.value,
        "copies": 1
      }
    },
      BOATLOAD_OF_GAS,
      Big(donation.value || '0').times(10 ** 24).toFixed())
  };

  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: [contract.new_default_meta.name, contract.nft_mint.name]}, //contract requesting access
      'NFT Marketplace', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>Sell your ticket!</h1>
      </header>
      { currentUser
        ? <Form onSubmit={onSubmit} currentUser={currentUser} />
        : <SignIn/>
      }
      { currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    new_default_meta: PropTypes.func.isRequired,
    nft_mint: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
