import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/apiConfig';
import PetrolContext from '../context/PetrolContext';
import useLocation from '../hooks/useLocation';
import { Filters, GasStationData, PetrolDataKeys } from '../types/Petrol';
import ReqStatus from '../types/ReqStatus';
import { raidusFilter, priceFilter } from '../utils/filters';

type Props = {
  children: React.ReactNode;
};

const initialData: GasStationData = {
  Fecha: '',
  ListaEESSPrecio: [],
};

const defaultFilters: Filters = {
  radio: 10,
  price_biodiesel: 3,
  price_bioetanol: 3,
  price_compressed_natural_gas: 3,
  price_liquefied_natural_gas: 3,
  price_liquefied_petroleum_gas: 3,
  price_gasoil_a: 3,
  price_gasoil_b: 3,
  price_gasoil_premiun: 3,
  price_gasoil_95_e10: 3,
  price_gasoil_95_e5: 3,
  price_gasoil_95_e5_premiun: 3,
  price_gasoil_98_e10: 3,
  price_gasoil_98_e5: 3,
  price_hydrogen: 3,
};

const PetrolProvider = memo(({ children }: Props) => {
  const [status, setStatus] = useState<ReqStatus>(ReqStatus.pending);
  const [allData, setAllData] = useState<GasStationData>(initialData);
  const [filteredData, setFilteredData] = useState<GasStationData>(initialData);
  const filtersFetched = useRef(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { hasLocation, initialPosition } = useLocation();

  const saveFilters = useCallback(async (fltrs: Filters) => {
    try {
      Object.entries(fltrs).forEach(async ([fKey, fVal]) => {
        await AsyncStorage.setItem(`@filters_${fKey}`, fVal.toString());
      });
    } catch (error) {}
  }, []);

  const getFilters = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const savedFilters = result.reduce<any>((acc, val) => {
        if (val[1] != null) {
          const filterKey = val[0].replace('@filters_', '');
          const filterVal = parseFloat(val[1]);
          acc[filterKey] = filterVal;
        }
        return acc;
      }, {});
      setFilters((prev) => ({ ...prev, ...savedFilters }));
    } catch (error) {}
  }, []);

  const handleSetFilters = useCallback((fltrs: Filters) => {
    saveFilters(fltrs);
    setFilters(fltrs);
  }, []);

  const retrieveData = useCallback(async () => {
    try {
      setStatus(ReqStatus.pending);
      const resp = await api.get<GasStationData>('/');
      setAllData(resp.data);
      setStatus(ReqStatus.fulfilled);
    } catch (error) {
      setStatus(ReqStatus.rejected);
    }
  }, []);

  useEffect(() => {
    getFilters();
    filtersFetched.current = true;
  }, []);

  useEffect(() => {
    if (
      hasLocation &&
      initialPosition.latitude !== 0 &&
      initialPosition.longitude !== 0 &&
      filtersFetched.current
    ) {
      retrieveData();
    }
  }, [hasLocation, initialPosition, retrieveData]);

  useEffect(() => {
    const filtered = allData.ListaEESSPrecio.filter((f) => {
      const r = raidusFilter(
        initialPosition,
        {
          latitude: parseFloat(f[PetrolDataKeys.lat].replace(',', '.')),
          longitude: parseFloat(f[PetrolDataKeys.long].replace(',', '.')),
        },
        filters.radio
      );
      const p = priceFilter(f, filters);
      return r && p;
    });
    setFilteredData({ ...allData, ListaEESSPrecio: filtered });
  }, [filters, allData]);

  return (
    <PetrolContext.Provider
      value={{
        allData,
        filteredData,
        status,
        filters,
        setFilters: handleSetFilters,
      }}
    >
      {children}
    </PetrolContext.Provider>
  );
});

export default PetrolProvider;
