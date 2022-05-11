import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { ImageUploader } from "./ImageUploader";
import Tooltip from "react-simple-tooltip";
import { PRICE_FOR_MINTING, PRICE_FOR_APPROVING} from "../constants";

const RECOMMENDED_NEAR = 0.01;

export default function Form({ onSubmit, currentUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.1);
  const [trackerNumber, setTrackerNumber] = useState("");
  const [rawImageUrl, setRawImageUrl] = useState("");
  const [nftStorageId, setNftStorageId] = useState("");

  const onSuccessImageUploaded = (data) => {
    setNftStorageId(data.ntftStorageUrl);
    setRawImageUrl(data.rawImageUrl);
  };

  const onSubmitForm = (e) => {
    onSubmit(e, {
      title,
      description,
      rawImageUrl,
      nftStorageId,
      price,
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset id="fieldset">

        <div>
          <label htmlFor="title">Title of the event</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="trackerNumber">Product tracker #:</label>
          <Tooltip
            className="wider-tooltip"
            arrow={0}
            content="This is what you are selling. It will be visible to the buyer once it is bought"
            placement="bottom"
            fontSize="13px">
            <span>❗️</span>
          </Tooltip>
          <input
            id="trackerNumber"
            value={trackerNumber}
            onChange={(e) => setTrackerNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">
            Instructions for the buyer about the ticket
          </label>
          <Tooltip className="wider-tooltip"
            arrow={0}
            content="Indicate what the buyer is buying. 
          I.e. 'I am selling a tracking number for the film. Use this number to print the resal tickets at your cinema'"
            placement="bottom"
            fontSize="13px"
            style={{ cursor: "pointer" }}
          >
            <span>❗️</span>
          </Tooltip>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            autoComplete="off"
            id="price"
            min="0.00001"
            step="0.00001"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          Upload a representative picture of the event
        </div>
        <ImageUploader
          trackerNumber={trackerNumber}
          onSuccess={(res) => onSuccessImageUploaded(res)}
          onError={() => {}}
          isDisabled={!trackerNumber}
        />

        <p>
            <i>Estimated fee (you will be refunded the unused amount):</i> {PRICE_FOR_MINTING + PRICE_FOR_APPROVING}
          <b><span title="NEAR Tokens"> Ⓝ</span></b>
        </p>
        <button type="submit" disabled={!nftStorageId}>
          Publish
        </button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
