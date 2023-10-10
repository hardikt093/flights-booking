import httpStatus from 'http-status';
import catchAsync from '../utils/catch-async';
import { bookFlight, createFlight, deleteFlightById, findFlightByFilter, findFlightById, getAllFlights, getFlightsCount, updateFlightById, uploadFile } from '../services/flight.service';
import ApiError from '../utils/api-error';
import { infinityPagination } from '../utils/infinity-pagination';
import Amadeus from 'amadeus';
import config from '../config/config';

const amadeus = new Amadeus({
  clientId: config.amadeus.clientId,
  clientSecret: config.amadeus.clientSecret,
});

const addFlightHandler = catchAsync(async (req, res) => {
  const imageUploaded = await uploadFile(req);
  req.body.allUsers = req.user.id;
  req.body.image = imageUploaded.imageUrl;
  const flight = await createFlight(req.body);
  res.status(httpStatus.CREATED).send(flight);
});

const getAllFlightsHandler = catchAsync(async (req, res) => {
  let { limit } = req.query;
  const { page } = req.query;

  if (limit > 50) {
    limit = 50;
  }

  const totalCount = await getFlightsCount();

  res.status(httpStatus.OK).send(
    infinityPagination(
      await getAllFlights({
        page,
        limit,
      }), totalCount
    )
  );
});

const getAirportsHandler = catchAsync(async (req, res) => {
  const parameter = req.query.param;
  amadeus.referenceData.locations
    .get({
      keyword: parameter,
      subType: 'AIRPORT',
    })
    .then((response) => {
      let result = response.result.data;
      result = result.map(element => {
        const data = {
          name: element.name,
          id: (element.id).substring(1)
        }
        return data;
      });
      res.send(result);
    })
    .catch((response) => {
      res.send(response);
    });
});

const getFlightHandler = catchAsync(async (req, res) => {
  const flight = await findFlightById(req.params.flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  res.send(flight);
});

const updateFlightHandler = catchAsync(async (req, res) => {
  const flight = await updateFlightById(req.params.flightId, req.body);
  res.send(flight);
});

const deleteFlightHandler = catchAsync(async (req, res) => {
  await deleteFlightById(req.params.flightId);
  res.status(httpStatus.NO_CONTENT).send();
});

const bookFlightHandler = catchAsync(async (req, res) => {
  await bookFlight({
    allUsers: req.user.id,
    flight: req.params.flightId
  }, req.params.flightId);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchFlightsHandler = catchAsync(async (req, res) => {
  const result = await findFlightByFilter(req.body);
  res.status(httpStatus.OK).send(result.length ? result : { message: 'No data found'});
});

export { addFlightHandler, getFlightHandler, deleteFlightHandler, updateFlightHandler, getAirportsHandler, bookFlightHandler, searchFlightsHandler, getAllFlightsHandler };

