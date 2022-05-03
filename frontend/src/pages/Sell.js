import React from "react";
import Big from "big.js";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form";
import SignIn from "../components/SignIn";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const Sell = ({ currentUser, nearConfig, contract, wallet }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, trackerNumber, donation, nftStorageId } =
      e.target.elements;

    fieldset.disabled = true;

    contract.nft_mint(
      {
        token_id: uuidv4(),
        receiver_id: currentUser.accountId,
        metadata: {
          title: "New NFT for you from Brandy",
          description: "My NFT media",
          media: nftStorageId.value,
          copies: 1,
        },
      },
      BOATLOAD_OF_GAS,
      Big(donation.value || "0")
        .times(10 ** 24)
        .toFixed()
    );
  };

  const signIn = () => {
    console.log("wallet", wallet, currentUser);
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.new_default_meta.name, contract.nft_mint.name],
      }, //contract requesting access
      "NFT Marketplace", //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const LoggedIn = () => {
    return (
      <>
        <Form onSubmit={onSubmit} currentUser={currentUser} />
        <button onClick={signOut}>Log out</button>
      </>
    );
  };

  const NotLoggedIn = () => {
    return (
      <>
        <SignIn />
        <button onClick={signIn}>Log in</button>
      </>
    );
  };

  return (
    <div>
      <div>
        <h1>Sell your ticket!</h1>
      </div>
      {currentUser ? <LoggedIn /> : <NotLoggedIn />}
    </div>
  );
};

export default Sell;
