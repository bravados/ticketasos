import React from "react";

const Card = ({ info }) => {
  return (
    <li className="card">
      <img className="card__image" src={info.url} />
      <h3>{info.title}</h3>
      <p>{info.description}</p>
      <button className="buy__ticket">Buy</button>
    </li>
  );
};

export default Card;
