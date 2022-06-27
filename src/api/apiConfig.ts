import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_SERVER_URI + '/EstacionesTerrestres',
});

api.interceptors.request.use(async (config: any) => {
  config.headers.Accept = '*/*';

  return config;
});

export default api;
