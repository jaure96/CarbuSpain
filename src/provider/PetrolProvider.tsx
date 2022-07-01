import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/apiConfig';
import PetrolContext from '../context/PetrolContext';
import useLocation from '../hooks/useLocation';
import { Filters, GasStationData, PetrolDataKeys } from '../types/Petrol';
import ReqStatus from '../types/ReqStatus';
import { raidusFilter } from '../utils/distance';

type Props = {
  children: React.ReactNode;
};

const initialData: GasStationData = {
  Fecha: '',
  ListaEESSPrecio: [],
};

const PetrolProvider = memo(({ children }: Props) => {
  const [status, setStatus] = useState<ReqStatus>(ReqStatus.pending);
  const [gasStationData, setGasStationData] =
    useState<GasStationData>(initialData);
  const filtersFetched = useRef(false);
  const [filters, setFilters] = useState<Filters>({ radio: 10 });
  const { hasLocation, initialPosition } = useLocation();

  const saveFilters = useCallback(async (fltrs: Filters) => {
    try {
      const { radio } = fltrs;
      await AsyncStorage.setItem('@filters_radio', radio.toString());
    } catch (error) {}
  }, []);

  const getFilters = useCallback(async () => {
    try {
      const r = await AsyncStorage.getItem('@filters_radio');
      if (r !== null) {
        setFilters((prev) => ({ ...prev, radio: parseFloat(r) }));
      }
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
      const filtered = resp.data.ListaEESSPrecio.filter((f) => {
        const c = raidusFilter(
          initialPosition,
          {
            latitude: parseFloat(f[PetrolDataKeys.lat].replace(',', '.')),
            longitude: parseFloat(f[PetrolDataKeys.long].replace(',', '.')),
          },
          filters.radio
        );
        return c;
      });
      setGasStationData({ ...resp.data, ListaEESSPrecio: filtered });
      setStatus(ReqStatus.fulfilled);
    } catch (error) {
      setGasStationData(initialData);
      setStatus(ReqStatus.rejected);
    }
  }, [filters, initialPosition]);

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
  }, [hasLocation, initialPosition, filters, retrieveData]);

  return (
    <PetrolContext.Provider
      value={{
        data: gasStationData,
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
