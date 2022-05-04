import React, { useEffect } from "react";
import Card from "../components/Card";

const Buy = ({ contract, nearConfig }) => {
  const events = [];
  // const events = [
  //   {
  //     title: "title one",
  //     description: "description",
  //     url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
  //   },
  //   {
  //     title: "title two",
  //     description: "description 2",
  //     url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
  //   },
  //   {
  //     title: "title 3",
  //     description: "description 2",
  //     url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
  //   },
  //   {
  //     title: "title 4",
  //     description: "description 2",
  //     url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
  //   },
  // ];
  useEffect(async () => {
    const values = await contract.get_sales_by_nft_contract_id({
      nft_contract_id: "nft.ticketasos.testnet",
      // nft_contract_id: nearConfig.nftContractName,
    });
    console.log(values);
  }, []);

  console.log(nearConfig);
  return (
    <div>
      <div>
        <h1>Buy your tickets!</h1>
      </div>
      <div className="marketplace">
        {events?.length > 0 ? (
          <ul className="list">
            {events?.map((event) => (
              <Card key={event.title} info={event} />
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
