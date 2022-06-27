import React from 'react';
import { PetrolContextProps } from '../types/PetrolContext';

const PetrolContext = React.createContext<PetrolContextProps | null>(null);

export default PetrolContext;
