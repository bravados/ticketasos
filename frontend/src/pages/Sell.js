import React from "react";
import Big from "big.js";
import { v4 as uuidv4 } from "uuid";
import getConfig from "../config";
import Form from "../components/Form";
import SignIn from "../components/SignIn";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const Sell = ({ currentUser, nearConfig, contract, wallet }) => {
  const onSubmit = (e, data) => {
    e.preventDefault();

    const { fieldset } = e.target.elements;
    fieldset.disabled = true;

    const { title, description, rawImageUrl, donation, nftStorageId, price } =
      data;
    const token_id = uuidv4();
    contract.nft_mint(
      {
        token_id,
        receiver_id: currentUser.accountId,
        metadata: {
          title,
          description,
          media: nftStorageId,
          extra: rawImageUrl,
          copies: 1,
        },
      },
      BOATLOAD_OF_GAS,
      Big(donation || "0")
        .times(10 ** 24)
        .toFixed()
    );

    // approve marketplace to sell my token for the given price
    contract.nft_approve({
      token_id,
      account_id: nearConfig.marketContractName,
      msg: price,
    });
  };

  const signIn = () => {
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

  const LoggedIn = () => {
    return (
      <>
        <Form onSubmit={onSubmit} currentUser={currentUser} />
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
