import "regenerator-runtime/runtime";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Header from "./components/Header";

const App = ({
  nftContract,
  marketContract,
  currentUser,
  nearConfig,
  wallet,
}) => {
  return (
    <>
      <Header wallet={wallet} currentUser={currentUser} />
      <main>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Sell
                  contract={nftContract}
                  currentUser={currentUser}
                  nearConfig={nearConfig}
                  wallet={wallet}
                />
              )}
            />
            <Route
              exact
              path="/buy"
              render={() => (
                <Buy contract={marketContract} nearConfig={nearConfig} />
              )}
            />
          </Switch>
        </Router>
      </main>
    </>
  );
};

App.propTypes = {
  nftContract: PropTypes.shape({
    new_default_meta: PropTypes.func.isRequired,
    nft_mint: PropTypes.func.isRequired,
    nft_approve: PropTypes.func.isRequired,
  }).isRequired,
  marketContract: PropTypes.shape({
    get_sales_by_nft_contract_id: PropTypes.func.isRequired,
    offer: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    nftContractName: PropTypes.string.isRequired,
    marketContractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
