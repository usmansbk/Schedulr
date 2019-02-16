export const buildEventForm = (values) => {
  let venue = null;
  if (values.venue && values.venue.address) {
    venue = {
      address: values.venue.address
    };
    if (values.venue.location.latitude && values.location.longitude) {
      venue.location = values.venue.location;
    }
  }
  const input = {
    ...values,
    title: values.title.trim(),
    description: values.description.trim(),
    venue
  };
  return input;
};

export const buildBoardForm = (values, loc) => {
  const location = (loc && loc.latitude && loc.longitude) ? loc : null;
  const input = {
    ...values,
    name: values.name.trim(),
    description: values.description.trim(),
    location,
  };
  return input;
};