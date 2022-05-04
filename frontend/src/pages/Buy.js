import React from "react";
import Card from "../components/Card";

const Buy = () => {
  const events = [
    {
      title: "title one",
      description: "description",
      url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
    },
    {
      title: "title two",
      description: "description 2",
      url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
    },
    {
      title: "title 3",
      description: "description 2",
      url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
    },
    {
      title: "title 4",
      description: "description 2",
      url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x_r2.png",
    },
  ];
  return (
    <div>
      <div>
        <h1>Buy your tickets!</h1>
      </div>
      <div className="marketplace">
        {events?.length > 0 ? (
          <ul className="list">
            {events.map((event) => (
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
