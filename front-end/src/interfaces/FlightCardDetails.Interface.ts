import { FlightDataInterface } from "./Flight.interface";

export interface FlightCardDetailsInterface {
    data: FlightDataInterface;
    getData:()=>void
  }