import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import { ImageUploader } from "./ImageUploader";

const RECOMMENDED_NEAR = 0.009;

export default function Form({ onSubmit, currentUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [trackerNumber, setTrackerNumber] = useState("");
  const [rawImageUrl, setRawImageUrl] = useState("");
  const [nftStorageId, setNftStorageId] = useState("");
  const [donation, setDonation] = useState(RECOMMENDED_NEAR);

  const onSuccessImageUploaded = (data) => {
    setNftStorageId(data.ntftStorageUrl);
    setRawImageUrl(data.rawImageUrl);
  };

  const onSubmitForm = (e) => {
    onSubmit(e, {
      title,
      description,
      rawImageUrl,
      donation,
      nftStorageId,
      price,
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <fieldset id="fieldset">
        <div>
          <label htmlFor="trackerNumber">Product tracker #:</label>
          <input
            id="trackerNumber"
            value={trackerNumber}
            onChange={(e) => setTrackerNumber(e.target.value)}
          />
        </div>

        <p>
          <label htmlFor="title">Title of the event</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="description">
            Instructions for the buyer about the ticket
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </p>

        <p>
          Upload a representative picture of the event, {currentUser.accountId}!
        </p>
        <ImageUploader
          trackerNumber={trackerNumber}
          onSuccess={(res) => onSuccessImageUploaded(res)}
          onError={() => {}}
          isDisabled={!trackerNumber}
        />

        <p>
          <label htmlFor="donation">
            Pay to store this ticket ✨ (optional?):
          </label>
          <input
            autoComplete="off"
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0.009"
            step="0.01"
            type="number"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit" disabled={!nftStorageId}>
          Sign
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
