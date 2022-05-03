import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { ImageUploader } from './ImageUploader';

const RECOMMENDED_NEAR = 0.01

export default function Form({ onSubmit, currentUser }) {
  const [trackerNumber, setTrackerNumber] = useState("");
  const nftStorageId = useRef();

  const setNftStorageId = (data) => {
    nftStorageId.current.value = data
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Upload a representative picture of the event, { currentUser.accountId }!</p>

        <ImageUploader
          trackerNumber={trackerNumber}
          onSuccess={(res) => setNftStorageId(res)}
          onError={() => {}}
        />

        <p>
          <label htmlFor="trackerNumber">Tracker:</label>
          <input id="trackerNumber" value={trackerNumber} onChange={(e) => setTrackerNumber(e.target.value)} />
        </p>

        <p>
          <label htmlFor="donation">Pay to store this ticket ✨ (optional?):</label>
          <input
            autoComplete="off"
            defaultValue={RECOMMENDED_NEAR}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0.009"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <input id="nftStorageId" ref={nftStorageId} type="text" hidden />
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
    balance: PropTypes.string.isRequired
  })
};
