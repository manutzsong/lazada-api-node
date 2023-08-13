import api from './helpers/api';
import auth from './helpers/auth';
import 'dotenv/config';

const LazadaAPI = {
  auth: auth,
  api: api,
};

export {LazadaAPI};
