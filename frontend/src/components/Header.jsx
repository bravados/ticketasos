import React from "react";
import { Link } from "react-router-dom";

const Header = ({ wallet, currentUser }) => {
  const signIn = () => {
    wallet.requestSignIn();
  };
  
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <header>
      <h1>Ticketasos Marketplace</h1>
      <Link to="/buy">
        <button className="button-link-buy">
          BUY
        </button>
      </Link>

      <Link to="/">
        <button className="button-link-sell">
          SELL
        </button>
      </Link>
      {currentUser
      ? <a onClick={signOut}><button className="button-wallet">Log out</button></a> 
      : <a onClick={signIn}><button className="button-wallet">Connect</button></a>}
    </header>
  );
};

export default Header;
