import { FlightDataInterface } from "./Flight.interface";

export interface AddFlightInterface {
    setSearchData?: (value: any) => void;
    flightData?: FlightDataInterface;
    setIsEdit?: (value: boolean) => void;
}