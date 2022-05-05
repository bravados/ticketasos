import React from "react";

const Card = ({ info, onClick }) => {
  const { title, description, extra: url, token_id, sale_conditions } = info;
  return (
    <li className="card">
      <div className="card__image">
        <img src={url} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        className="buy__ticket"
        onClick={() => onClick(token_id, sale_conditions)}
      >
        {`Buy for ${sale_conditions}`}
      </button>
    </li>
  );
};

export default Card;
