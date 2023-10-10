import Joi from 'joi';

const addFlightValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    departure: Joi.string().required(),
    return: Joi.string().required()
  }),
};

const getDeletetBookFlightValidation = {
  params: Joi.object().keys({
    flightId: Joi.string(),
  }),
};

const getAirportsValidation = {
  params: Joi.object().keys({
    param: Joi.string(),
  }),
};

const updateFlightValidation = {
  params: Joi.object().keys({
    flightId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      from: Joi.string(),
      to: Joi.string(),
      departure: Joi.string(),
      return: Joi.string()
    })
    .min(1),
};

const getAllFlightsValidation = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const searchFlightsValidation = {
  body: Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
    departure: Joi.string().required(),
    return: Joi.string().required(),
  }),
};

export { addFlightValidation, getDeletetBookFlightValidation, updateFlightValidation, getAllFlightsValidation, getAirportsValidation, searchFlightsValidation };
