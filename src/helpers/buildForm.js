export const buildEventForm = (values, myLocation) => {
  // let location = (myLocation && myLocation.lat && myLocation.lon) ? myLocation : null;
  let temp = Object.assign({}, values);
  Object.keys(temp).forEach(key => {
    const value = temp[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        temp[key] = null;
      } else {
        temp[key] = trimmed;
      }
    } 
  });
  return temp;
};

export const buildScheduleForm = (values, myLocation) => {
  // const location = (myLocation && myLocation.lat && myLocation.lon) ? myLocation : null;
  let temp = Object.assign({}, values);
  Object.keys(temp).forEach(key => {
    const value = temp[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        temp[key] = null;
      } else {
        temp[key] = trimmed;
      }
    } 
  });
  return temp;
};