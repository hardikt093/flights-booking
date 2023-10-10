import { Box, Button, Container, Typography } from "@mui/material";
import "./Booking.scss";
import AllImages from "../../constant/images";
import AddFlight from "../add-flight/AddFlight";
import FlightResult from "../flightResult";
import { useState } from "react";
import { FlightDataInterface } from "../../interfaces/Flight.interface";

const Booking = () => {
  const [searchData, setSearchData] = useState<FlightDataInterface[]>([]);
  console.log('searchData: ', searchData);
  return (
    <div>
      <div className="booking-container">
        <Container maxWidth="lg">
          <Box component="div" className="main-booking">
            <Typography className="headline">Just seconds away from</Typography>
            <Box className="sub-headline">
              <Typography className="headline-2">A WORLD OF LUXURY</Typography>
              <Typography className="headline-3">
                Book and manage your entire vacation or business trip from
                flights, private jet charter flights, car rentals, hotels, and
                excursions with a few clicks.
              </Typography>
              <Button
                className="start-button"
                variant="contained"
                endIcon={<img src={AllImages.grater} />}
              >
                Let's Start Now
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
      <div className="flightResult">
        <Container maxWidth="lg">
          <div className="add-flight-container">
            <AddFlight setSearchData={setSearchData} />
          </div>
          <img src={AllImages.Ornament2} className="left" />
          <img src={AllImages.Ornament69} className="right" />
          {searchData && <FlightResult searchData={searchData} />}
        </Container>
      </div>
    </div>
  );
};

export default Booking;
