import React from "react";
import { Typography } from "@mui/material";
import AllImages from "../../constant/images";
import FlightCardDetails from "../flightCardDetails";
import { FlightCardInterface } from "../../interfaces/FlightCard.interface";

const FlightCard = ({ data, getData }: FlightCardInterface) => {
  return (
    <div className="root">
      <div className="image">
        {data?.bookedCount > 0 &&
          <Typography>{data?.bookedCount} Bookings </Typography>
        }
        <img src={data?.image} />
      </div>
      <FlightCardDetails data={data} getData={getData} />

    </div>
  );
};

export default FlightCard;
