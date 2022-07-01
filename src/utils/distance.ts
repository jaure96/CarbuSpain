import Location from '../types/Location';

export const raidusFilter = (
  pos1: Location,
  pos2: Location,
  radius: number
) => {
  const { latitude: lat1, longitude: lng1 } = pos1;
  const { latitude: lat2, longitude: lng2 } = pos2;
  const d = distance(lat1, lng1, lat2, lng2);
  return d <= radius;
};

const distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var R = 6371; // km
  return (
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    ) * R
  );
};
