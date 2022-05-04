import React from "react";

const Card = ({ info }) => {
  const { title, description, extra: url } = info;
  return (
    <li className="card">
      <div className="card__image">
        <img src={url} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="buy__ticket">Buy</button>
    </li>
  );
};

export default Card;
