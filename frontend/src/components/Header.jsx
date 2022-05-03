import React from "react";

const Header = ({ wallet, currentUser }) => {
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <header>
      <h1>Ticketaso Marketplace</h1>
      {currentUser && <a onClick={signOut}>Log out</a>}
    </header>
  );
};

export default Header;
