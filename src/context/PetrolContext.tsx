import React from 'react';
import { Filters, GasStationData } from '../types/Petrol';
import ReqStatus from '../types/ReqStatus';

type PetrolContextProps = {
  status: ReqStatus;
  data: GasStationData;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const PetrolContext = React.createContext({} as PetrolContextProps);

export default PetrolContext;
