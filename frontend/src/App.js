import "regenerator-runtime/runtime";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Header from "./components/Header";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  return (
    <>
      <Header />
      <main>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Sell
                  contract={contract}
                  currentUser={currentUser}
                  nearConfig={nearConfig}
                  wallet={wallet}
                />
              )}
            />
            <Route exact path="/buy" component={Buy} />
          </Switch>
        </Router>
      </main>
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    new_default_meta: PropTypes.func.isRequired,
    nft_mint: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
