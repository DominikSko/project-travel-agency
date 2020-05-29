/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  //  DONE - filter by duration, do omówienia
  if (filters.duration.to && filters.duration.from) {
    output = output.filter ((trip) =>
      trip.days >= filters.duration.from && trip.days <= filters.duration.to
    );
  }

  // TODO - filter by tags
  if (filters.tags.length != 0) {
    output = output.filter((trip) => {
      for (let tag of trip.tags) {
        if (filters.tags.indexOf(tag) > -1) {
          return trip;
        }
      }
    });
  }

  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

export const getTripById = ({trips}, tripId) => {
  //const filtered = trips;
  // DONE - filter trips by tripId ,do omówienia filtrowanie wycieczek
  const filtered = trips.filter(trip => trip.id == tripId);

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  //const filtered = trips;
  // TODO - filter trips by countryCode, do omówienia filtrowanie krajów ?
  const filtered = trips.filter((trip) => trip.country.code == countryCode);

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
