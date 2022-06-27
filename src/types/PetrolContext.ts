import ReqStatus from './ReqStatus';

export enum PetrolDataKeys {
  cp = 'C.P.',
  direction = 'Dirección',
  schedule = 'Horario',
  lat = 'Latitud',
  location = 'Localidad',
  long = 'Longitud (WGS84)',
  margin = 'Margen',
  city = 'Municipio',
  price_biodiesel = 'Precio Biodiesel',
  price_bioetanol = 'Precio Bioetanol',
  price_compressed_natural_gas = 'Precio Gas Natural Comprimido',
  price_liquefied_natural_gas = 'Precio Gas Natural Licuado',
  price_liquefied_petroleum_gas = 'Precio Gases licuados del petróleo',
  price_gasoil_a = 'Precio Gasoleo A',
  price_gasoil_b = 'Precio Gasoleo B',
  price_gasoil_premiun = 'Precio Gasoleo Premium',
  price_gasoil_95_e10 = 'Precio Gasolina 95 E10',
  price_gasoil_95_e5 = 'Precio Gasolina 95 E5',
  price_gasoil_95_e5_premiun = 'Precio Gasolina 95 E5 Premium',
  price_gasoil_98_e10 = 'Precio Gasolina 98 E10',
  price_gasoil_98_e5 = 'Precio Gasolina 98 E5',
  price_hydrogen = 'Precio Hidrogeno',
  province = 'Provincia',
  referral = 'Remisión',
  sign = 'Rótulo',
  sale_type = 'Tipo Venta',
  bio_ethanol = '% BioEtanol',
  methyl_ester = '% Éster metílico',
  id_eess = 'IDEESS',
  id_city = 'IDMunicipio',
  id_province = 'IDProvincia',
  id_ccaa = 'IDCCAA',
}

export interface GasStationData {
  Fecha: string;
  ListaEESSPrecio: { [key in keyof typeof PetrolDataKeys]: string }[];
}

export interface PetrolContextProps {
  status: ReqStatus;
  data: GasStationData | null;
}
