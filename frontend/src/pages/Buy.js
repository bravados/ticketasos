import React, { useEffect, useState } from "react";
import Big from "big.js";
import Card from "../components/Card";

const BOATLOAD_OF_GAS = Big(15)
  .times(10 ** 13)
  .toFixed();

const Buy = ({ marketContract, nftContract, nearConfig }) => {
  const [availableTokens, setAvailableTokens] = useState([]);

  const mergedNftMetadata = ({ allSales, allNftMetadata }) => {
    return allSales.map((sale) => {
      const nftMetadata = allNftMetadata.find(
        ({ token_id }) => token_id === sale.token_id
      )?.metadata;
      return { ...sale, ...nftMetadata };
    });
  };

  const onBuyNFT = (token_id, sale_conditions) => {
    marketContract.offer(
      {
        nft_contract_id: nearConfig.nftContractName,
        token_id,
      },
      BOATLOAD_OF_GAS,
      Big(parseFloat(sale_conditions))
        .times(10 ** 24)
        .toFixed()
    );
  };

  useEffect(async () => {
    const allSales = await marketContract.get_sales_by_nft_contract_id({
      nft_contract_id: nearConfig.nftContractName,
      limit: 10,
    });
    const allNftMetadata = await nftContract.nft_tokens();
    const cardData = mergedNftMetadata({ allSales, allNftMetadata });

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
              <Card key={data.token_id} info={data} onClick={onBuyNFT} />
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
