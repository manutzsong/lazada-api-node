import { Parameters } from '../types/LazadaPayload';
import { LazadaUserTokenInfo } from '../types/LazadaUserTokenInfo';
import auth from './auth';
import axios from 'axios';
import 'dotenv/config';

const GenerateAccessToken = async ({ code }: { code: string }): Promise<LazadaUserTokenInfo> => {
  const route = '/auth/token/create';
  const signature = auth.generateSignUrlPayload({
    payload: {
      code,
    },
    apiPath: route,
  });
  const res = await axios({
    method: 'POST',
    url: `https://api.lazada.com/rest${route}`,

    data: {
      ...signature.payload,
      sign: signature.sign,
    },
  });
  return new Promise((resolve) => resolve(res.data));
};

const GetRequest = async ({
  accessToken,
  route,
  parameters,
}: {
  accessToken: string;
  route: string;
  parameters?: Parameters;
}):Promise<object> => {
  if (!process.env.LAZADA_ENDPOINT) {
    throw new Error('LAZADA_ENDPOINT must be set.');
  }
  const signature = auth.generateSignUrlPayload({
    payload: {
      access_token: accessToken,
      ...parameters,
    },
    apiPath: route,
  });

  const urlSearchParams = new URLSearchParams(signature.url);
  const params = Object.fromEntries(urlSearchParams.entries());

  try {
    const res = await axios.get(`${process.env.LAZADA_ENDPOINT}${route}`, {
      params,
    });
    return new Promise((resolve) => resolve(res.data.data));
  } catch (e) {
    console.log(e);
    return new Promise((_resolve, reject) => reject(e));
  }
};

const PostRequest = async ({
  accessToken,
  route,
  parameters,
}: {
  accessToken: string;
  route: string;
  parameters?: Parameters;
}):Promise<object> => {
  if (!process.env.LAZADA_ENDPOINT) {
    throw new Error('LAZADA_ENDPOINT must be set.');
  }

  const signature = auth.generateSignUrlPayload({
    payload: {
      access_token: accessToken,
      ...parameters,
    },
    apiPath: route,
  });
  try {
    const res = await axios({
      method: 'POST',
      url: `${process.env.LAZADA_ENDPOINT}${route}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: {
        ...signature.payload,
        sign: signature.sign,
      },
    });
    return new Promise((resolve) => resolve(res.data));
  } catch (e) {
    console.log(e);
    return new Promise((_resolve, reject) => reject(e));
  }
};

export default {
  GenerateAccessToken,
  GetRequest,
  PostRequest,
} as const;
