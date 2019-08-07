export const buildEventForm = (values, myLocation) => {
  // let location = (myLocation && myLocation.lat && myLocation.lon) ? myLocation : null;
  const input = {
    ...values,
    title: values.title.trim(),
    description: values.description.trim(),
    until: values.until || null
  };
  return input;
};

export const buildScheduleForm = (values, myLocation) => {
  // const location = (myLocation && myLocation.lat && myLocation.lon) ? myLocation : null;
  const input = {
    ...values,
    name: values.name.trim(),
    description: values.description.trim(),
  };
  return input;
};