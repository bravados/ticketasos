import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Buy = ({ contract, nearConfig, nftContract }) => {
  const [availableTokens, setAvailableTokens] = useState([]);

  useEffect(async () => {
    // const values = await contract.get_sales_by_nft_contract_id({
    //   nft_contract_id: "nft.ticketasos.testnet",
    //   // nft_contract_id: nearConfig.nftContractName,
    // });
    setAvailableTokens(await nftContract.nft_tokens());
  }, []);

  return (
    <div>
      <div>
        <h1>Buy your tickets!</h1>
      </div>
      <div className="marketplace">
        {availableTokens?.length > 0 ? (
          <ul className="list">
            {availableTokens?.map(({ metadata, token_id }) => (
              <Card key={token_id} info={metadata} />
            ))}
          </ul>
        ) : (
          <div>No events available</div>
        )}
      </div>
    </div>
  );
};

export default Buy;
