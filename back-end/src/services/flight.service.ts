import { IPaginationOptions } from '../utils/types/pagination-options.type';
import AppDataSource from '../db/app-data-source';
import { Flight } from '../entities/flight.entity';
import { Booking } from '../entities/booking.entity';
import config from '../config/config';
const firebase = require("firebase/app");
const firebaseConfig = {
  apiKey: config.firebase.firebaseApiKey,
  authDomain: config.firebase.firebaseAuthDomain,
  projectId: config.firebase.firebaseProjectId,
  storageBucket: config.firebase.firebaseStorageBucket,
  messagingSenderId: config.firebase.firebaseMessagingSenderId,
  appId: config.firebase.firebaseAppId
}
firebase.initializeApp(firebaseConfig);
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { io } from '../index';
const storage = getStorage();

const flightRepository = AppDataSource.getRepository(Flight);
const bookingRepository = AppDataSource.getRepository(Booking);

// To create flight
const createFlight = async (input: Flight): Promise<Flight> => {
  return await flightRepository.save(flightRepository.create(input));
};

// To get total flight count
const getFlightsCount = async (): Promise<number> => {
  return await flightRepository.createQueryBuilder("flight").getCount();
};

// To get all flights
const getAllFlights = async (paginationOptions: IPaginationOptions): Promise<Flight[]> => {
  const flights = await flightRepository.find({
    order: {
      bookedCount: "DESC"
    },
    skip: (paginationOptions.page - 1) * paginationOptions.limit,
    take: paginationOptions.limit,
  });
  return flights;
};

// To get flight by id
const findFlightById = async (flightId: string): Promise<Flight | null> => {
  return await flightRepository.findOneBy({ id: flightId });
};

// To get flight by filter
const findFlightByFilter = async (filterObj: { from: string, to: string, departure?, return?}) => {
  const result = await flightRepository.query(`select * from flights as f WHERE f."from" LIKE $1 AND f."to" LIKE $2 AND f."departure" LIKE $3 AND f."return" LIKE $4`, [`%${filterObj.from}%`, `%${filterObj.to}%`, `${filterObj.departure}`, `${filterObj.return}`]);
  return result;
};

// To update flight
const updateFlightById = async (flightId: string, updateBody: Partial<Flight>): Promise<Flight> => {
  return await flightRepository.save(
    flightRepository.create({
      id: flightId,
      ...updateBody,
    })
  );
};

// To delete flight
const deleteFlightById = async (flightId): Promise<void> => {
  await flightRepository.delete(flightId);
};

// To book flight
const bookFlight = async (input: Partial<Booking>, flightId: string): Promise<void> => {
  const flight = await findFlightById(flightId);
  if (!flight) {
    throw new Error('Flight not exist');
  }
  await bookingRepository.save(bookingRepository.create(input));
  const updatedFlight = await updateFlightById(flightId, { bookedCount: flight?.bookedCount + 1 });
  io.emit('count', updatedFlight);
}

// To upload image
const uploadFile = async (req): Promise<{ imageUrl: string }> => {
  const imageFile = req.files["image"][0];
  const imageFileName = `${Date.now()}_${imageFile.originalname}`;
  const imageData = { contentType: "image/jpeg" };
  const imageRef = ref(storage, `images/${imageFileName}`);
  await uploadBytes(imageRef, imageFile.buffer, imageData);
  const imageUrl = await getDownloadURL(imageRef);

  return { imageUrl };
};

export { createFlight, findFlightById, deleteFlightById, updateFlightById, bookFlight, findFlightByFilter, uploadFile, getAllFlights, getFlightsCount };
