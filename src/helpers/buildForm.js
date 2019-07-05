export const buildEventForm = (values, myLocation) => {
  let venue = null;
  if (values.venue && values.venue.address) {
    venue = {
      address: values.venue.address
    };
  }
  if (
      myLocation &&
      myLocation.lat &&
      myLocation.lon
    ) {
    venue = venue || {};
    venue.location = myLocation;
  }
  const input = {
    ...values,
    title: values.title.trim(),
    description: values.description.trim(),
    venue,
    until: values.until || null
  };
  return input;
};

export const buildBoardForm = (values, myLocation) => {
  const location = (myLocation && myLocation.lat && myLocation.lon) ? myLocation : null;
  const input = {
    ...values,
    name: values.name.trim(),
    description: values.description.trim(),
    location,
  };
  return input;
};