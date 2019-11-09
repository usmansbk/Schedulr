import env from 'config/env';

const HOST = env.GEODB_HOST;
const KEY = env.GEODB_API_KEY;

const printableNumber = num => (num < 0 ? "" : "+") + num;

const parseLocation = location => {
    const { lat, lng } = location;
    return `${printableNumber(lat)}${printableNumber(lng)}`
};

export default function(location) {
    const locationId = parseLocation(location);
    const url = `https://${HOST}/v1/geo/locations/${locationId}/nearbyCities?limit=1&radius=100`;
    const headers = {
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": KEY
    };
    return fetch(url, {
        method: 'GET',
        headers
    }).then(response => response.json())
    .then(json => {
        const { data, errors } = json;
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        return data;
    });
}