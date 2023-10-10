const allRoles = {
  user: ['bookFlights', 'manageBooking'],
  flight: ['manageFlights', 'manageBooking']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
