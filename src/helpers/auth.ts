import { createHmac } from 'crypto';
import { Parameters } from '../types/LazadaPayload';

type Args = {
  payload: Parameters; // string | number,
  apiPath: string;
};

const keysort = (unordered: Parameters): Parameters => {
  return Object.keys(unordered)
    .sort()
    .reduce((ordered: Parameters, key) => {
      ordered[key] = unordered[key];
      return ordered;
    }, {});
};

const concatDictionaryKeyValue = (object: Parameters): string => {
  return Object.keys(object).reduce((concatString, key) => concatString.concat(key + object[key]), '');
};

export class AuthURLGenerator {
  public generateSignUrlPayload(args: Args) {
    if (!process.env.APP_SECRET || !process.env.APP_KEY) {
      throw new Error('Missing Environment variables');
    }
    const { payload, apiPath } = args;
    const payloadAppend = payload;
    payloadAppend.sign_method = 'sha256';
    payloadAppend.timestamp = Date.now().toString();
    payloadAppend.app_key = process.env.APP_KEY;

    const keysortParams = keysort(payloadAppend);
    // 2. Concatenate the sorted parameters into a string i.e. "key" + "value" + "key2" + "value2"...
    const concatString = concatDictionaryKeyValue(keysortParams);

    // 3. Add API name in front of the string in (2)
    const preSignString = apiPath + concatString;

    // 4. Encode the concatenated string in UTF-8 format & and make a digest (HMAC_SHA256)
    const hash = createHmac('sha256', process.env.APP_SECRET)
      .update(preSignString)
      // 5. Convert the digest to hexadecimal format
      .digest('hex');

    const resHash = hash.toUpperCase();
    let url = ``;
    for (const [key, value] of Object.entries(keysortParams)) {
      url += `${key}=${value}&`;
    }
    url += `sign=${resHash}`;

    return {
      payload,
      sign: resHash,
      url,
    }; // must use upper case
  }
  public authURL(): string {
    if (!process.env.CALLBACK_URL || !process.env.APP_KEY) {
      throw new Error('Missing Environment variables');
    }
    const url = `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${process.env.CALLBACK_URL}&client_id=${process.env.APP_KEY}`;
    return url;
  }
}
export default new AuthURLGenerator();
