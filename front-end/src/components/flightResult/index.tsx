import { Container, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AllImages from '../../constant/images'
import FlightCardDetails from '../flightCardDetails'
import { FlightDataInterface } from '../../interfaces/Flight.interface';
import { getAllFlightsByUser } from '../../services/Flight.service';
import Flight from '../flight/Flight';
import { FlightResultInterface } from '../../interfaces/FlightResult.interface';
import { io } from "socket.io-client";
const baseUrl: string | undefined = process.env.REACT_APP_API_BASE_URL;
let socket: any;
if (baseUrl) {
    socket = io(baseUrl);
}

const FlightResult = ({ searchData }: FlightResultInterface) => {
    const [flightData, setFlightData] = useState<FlightDataInterface[]>()
    const [flightDetails, setFlightDetails] = useState<FlightDataInterface>()
    const [active, setActive] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const getData = async () => {
        if (searchData && searchData?.length > 1) {
            setFlightData(searchData?.slice(0, 3))
            setFlightDetails(searchData[0]);
            return;
        }
        if (searchData && searchData.hasOwnProperty('message')) {
            setFlightData(searchData)
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
        setFlightDetails(data.data[0])
    }

    const handleImage = (id: string, index: number) => {
        setActive(index)
        const selectedData = flightData && flightData.find((filght) => filght.id === id)
        selectedData && setFlightDetails(selectedData)
    }
    useEffect(() => {
        getData()
    }, [searchData])
    return (<>

        {windowWidth > 1200 ?
            <>
                {Array.isArray(flightData) ? <div className='flightResult-container'>
                    <div className='image-container'>
                        {flightData.slice(0, 3).map((flight: FlightDataInterface, index: number) => {
                            return <>
                                <div
                                    className={index === active ? 'active image' : 'image'}
                                    key={index}
                                >
                                    {flight?.bookedCount > 0 &&
                                        <Typography>{flight?.bookedCount} Bookings </Typography>
                                    }
                                    <img src={flight?.image} onClick={() => handleImage(flight?.id, index)} />
                                </div>
                            </>
                        })}

                    </div>
                    <div>
                        {flightDetails && <FlightCardDetails data={flightDetails} getData={getData} />}
                    </div>
                </div> : <p>{searchData && searchData.message}</p>}
            </> : <>{flightData && <Flight searchData={flightData} />}</>
        }

    </>)
}

export default FlightResult