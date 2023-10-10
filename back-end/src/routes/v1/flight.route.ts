import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { addFlightValidation, getAirportsValidation, getAllFlightsValidation, getDeletetBookFlightValidation, searchFlightsValidation, updateFlightValidation } from '../../validations/flight.validation';
import { addFlightHandler, bookFlightHandler, deleteFlightHandler, getAirportsHandler, getFlightHandler, searchFlightsHandler, updateFlightHandler, getAllFlightsHandler } from '../../controllers/flight.controller';
import multer from "multer";
import express from 'express';
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });

const flightRoute = express.Router();

// Add flight
flightRoute.route('/').post(auth('manageFlights'), upload.fields([
    { name: "image", maxCount: 1 },
  ]), validate(addFlightValidation), addFlightHandler);

// Get All Flights by User
flightRoute.route('/byUser').get(validate(getAllFlightsValidation), getAllFlightsHandler);

// Get All Airports
flightRoute.route('/getAirports').get(validate(getAirportsValidation), getAirportsHandler);

// Book flight
flightRoute.route('/book/:flightId').get(auth('bookFlights'), validate(getDeletetBookFlightValidation), bookFlightHandler);

// Get flights by filter
flightRoute.route('/search-flights').post(validate(searchFlightsValidation), searchFlightsHandler);

flightRoute
    .route('/:flightId')
    .get(validate(getDeletetBookFlightValidation), getFlightHandler)
    .patch(auth('manageFlights'), validate(updateFlightValidation), updateFlightHandler)
    .delete(auth('manageFlights'), validate(getDeletetBookFlightValidation), deleteFlightHandler);

export default flightRoute;
