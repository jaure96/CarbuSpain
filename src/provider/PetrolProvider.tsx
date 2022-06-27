import React, { memo, useEffect, useState } from 'react';
import api from '../api/apiConfig';
import PetrolContext from '../context/PetrolContext';
import { GasStationData } from '../types/PetrolContext';
import ReqStatus from '../types/ReqStatus';

type Props = {
  children: React.ReactNode;
};

const PetrolProvider = memo(({ children }: Props) => {
  const [status, setStatus] = useState<ReqStatus>(ReqStatus.pending);
  const [gasStationData, setGasStationData] = useState<GasStationData | null>(
    null
  );

  const retrieveData = async () => {
    try {
      setStatus(ReqStatus.pending);
      const resp = await api.get<GasStationData>('/');
      setGasStationData(resp.data);
      setStatus(ReqStatus.fulfilled);
    } catch (error) {
      setGasStationData(null);
      setStatus(ReqStatus.rejected);
    }
  };

  useEffect(() => {
    //retrieveData();
  }, []);

  return (
    <PetrolContext.Provider value={{ data: gasStationData, status }}>
      {children}
    </PetrolContext.Provider>
  );
});

export default PetrolProvider;
