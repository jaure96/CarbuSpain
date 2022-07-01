import React from 'react';
import { Filters, GasStationData } from '../types/Petrol';
import ReqStatus from '../types/ReqStatus';

type PetrolContextProps = {
  status: ReqStatus;
  allData: GasStationData;
  filteredData: GasStationData;
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

const PetrolContext = React.createContext({} as PetrolContextProps);

export default PetrolContext;
