import React, { useEffect, useState } from "react";
import Card from "../components/Card";


const Buy = ({ marketContract, nftContract, nearConfig }) => {
  const [availableTokens, setAvailableTokens] = useState([]);

  const mergedNftMetadata = ({ allSales, allNftMetadata }) => {
    return allSales.map((sale) => {
      const nftMetadata = allNftMetadata.find(({ token_id }) => token_id === sale.token_id)?.metadata;
      return { ...sale, ...nftMetadata };
    })
  }

  useEffect(async () => {
    const allSales = await marketContract.get_sales_by_nft_contract_id({
      nft_contract_id: nearConfig.nftContractName,
      limit: 10
    });
    const allNftMetadata = await nftContract.nft_tokens();
    const cardData = mergedNftMetadata({allSales, allNftMetadata});

    setAvailableTokens(cardData);
  }, []);

  return (
    <div>
      <div>
        <h1>Buy your tickets!</h1>
      </div>
      <div className="marketplace">
        {availableTokens?.length > 0 ? (
          <ul className="list">
            {availableTokens?.map((data) => (
              <Card key={data.token_id} info={data} />
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
