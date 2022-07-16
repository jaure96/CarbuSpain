import Location from '../types/Location';
import { Filters, PetrolDataKeys } from '../types/Petrol';

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

export const priceFilter = (
  data: {
    [key: string]: string;
  },
  filters: Filters
): boolean => {
  if (data[PetrolDataKeys.price_biodiesel].length) {
    if (
      Number(data[PetrolDataKeys.price_biodiesel].replace(',', '.')) >
      filters.price_biodiesel
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_bioetanol].length) {
    if (
      Number(data[PetrolDataKeys.price_bioetanol].replace(',', '.')) >
      filters.price_bioetanol
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_compressed_natural_gas].length) {
    if (
      Number(
        data[PetrolDataKeys.price_compressed_natural_gas].replace(',', '.')
      ) > filters.price_compressed_natural_gas
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_liquefied_natural_gas].length) {
    if (
      Number(
        data[PetrolDataKeys.price_liquefied_natural_gas].replace(',', '.')
      ) > filters.price_liquefied_natural_gas
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_liquefied_petroleum_gas].length) {
    if (
      Number(
        data[PetrolDataKeys.price_liquefied_petroleum_gas].replace(',', '.')
      ) > filters.price_liquefied_petroleum_gas
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_a].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_a].replace(',', '.')) >
      filters.price_gasoil_a
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_b].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_b].replace(',', '.')) >
      filters.price_gasoil_b
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_premiun].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_premiun].replace(',', '.')) >
      filters.price_gasoil_premiun
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_95_e10].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_95_e10].replace(',', '.')) >
      filters.price_gasoil_95_e10
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_95_e5].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_95_e5].replace(',', '.')) >
      filters.price_gasoil_95_e5
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_95_e5_premiun].length) {
    if (
      Number(
        data[PetrolDataKeys.price_gasoil_95_e5_premiun].replace(',', '.')
      ) > filters.price_gasoil_95_e5_premiun
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_98_e10].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_98_e10].replace(',', '.')) >
      filters.price_gasoil_98_e10
    ) {
      return false;
    }
  }
  if (data[PetrolDataKeys.price_gasoil_98_e5].length) {
    if (
      Number(data[PetrolDataKeys.price_gasoil_98_e5].replace(',', '.')) >
      filters.price_gasoil_98_e5
    ) {
      return false;
    }
  }
  return true;
};
