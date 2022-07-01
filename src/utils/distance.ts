import Location from '../types/Location';

export const raidusFilter = (
  pos1: Location,
  pos2: Location,
  radius: number
) => {
  const { latitude: lat1, longitude: lng1 } = pos1;
  const { latitude: lat2, longitude: lng2 } = pos2;
  const d = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
  return d <= radius;
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const deg2rad = (deg: number) => deg * (Math.PI / 180);
