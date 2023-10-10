import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import FlightCard from "../flightCard";
import "./Flight.scss";
import { getAllFlightsByUser } from "../../services/Flight.service";
import { FlightDataInterface, FlightInterface } from "../../interfaces/Flight.interface";
import { io } from "socket.io-client";
const baseUrl: string | undefined = process.env.REACT_APP_API_BASE_URL;
let socket: any;
if (baseUrl) {
  socket = io(baseUrl);
}

const Flight = ({ searchData }: FlightInterface) => {
  const [flightData, setFlightData] = useState<FlightDataInterface[]>([])
  const getData = async () => {
    if (searchData && searchData.length > 1) {
      setFlightData(searchData.slice(0, 3))
      return
    }
    const data = await getAllFlightsByUser({
      params: {
        limit: 1000,
        page: 1
      },
    })
    socket.on('count', (realTimeData: any) => {
      data.data.forEach((element: any) => {
        if (element.id === realTimeData.id) {
          element.bookedCount = realTimeData.bookedCount;
        }
      });
      setFlightData([...data.data])
    });
    setFlightData([...data.data])
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="main">
      <Container>
        {flightData.map((flight: FlightDataInterface) => {
          return <>
            <FlightCard data={flight} getData={getData} />
          </>
        })}
      </Container>
    </div>
  );
};

export default Flight;
