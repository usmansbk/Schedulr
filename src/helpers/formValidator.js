export default function validateForm(data) {
  let temp = Object.assign({}, data);
  Object.keys(temp).forEach(key => {
    const value = temp[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        temp[key] = null;
      } else {
        temp[key] = trimmed;
      }
    } else if (value === undefined) {
      temp[key] = null;
    }
  });
  return temp;
}

export function validateLocation({ lat, lon }) {
  if (!(lat && lon)) return null;
  return {
    lon,
    lat
  };
}