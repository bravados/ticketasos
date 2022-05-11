import React, { useState, useRef } from "react";
import Modal, {closeStyle} from 'simple-react-modal'

const Card = ({ info, onClick, currentUser }) => {
  const { title, description, extra: url, token_id, sale_conditions } = info;
  const [isShown, setIsShown] = useState(false);

  return (
    <li className="card">
      <div className="card__image">
        <img src={url} />
      </div>
      <h3 className="nft-title">{title}</h3>
      {description ? <a className="nft-description-link" href="#" onClick={() => setIsShown(true)}>see description...</a> : null}

      <Modal
        show={isShown}
        onClose={() => setIsShown(false)}
        containerStyle={{border: '2px solid #116b20', padding: '25px'}}
      >
        <div>
          {description}
        </div>
      </Modal>

      {currentUser &&
        <button
          className="buy__ticket"
          onClick={() => onClick(token_id, sale_conditions)}
        >
          {`Buy for ${sale_conditions} Ⓝ`}
        </button>
      }
    </li>
  );
};

export default Card;
