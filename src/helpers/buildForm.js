export const buildEventForm = (values, myLocation) => {
  let location = (myLocation && myLocation.lat && myLocation.location.lon) ? myLocation : null;
  const input = {
    ...values,
    title: values.title.trim(),
    description: values.description.trim(),
    location,
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