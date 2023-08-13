import {LazadaAPI} from '../index';

describe('authURL function', () => {
  // const OLD_ENV = process.env;

  // beforeEach(() => {
  //   jest.resetModules(); // Most important - it clears the cache
  //   process.env = { ...OLD_ENV }; // Make a copy
  // });

  // afterAll(() => {
  //   process.env = OLD_ENV; // Restore old environment
  // });

  it('should generate the correct auth URL', () => {
    const expectedURL = `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${process.env.CALLBACK_URL}&client_id=${process.env.APP_KEY}`;

    const result = LazadaAPI.auth.authURL();
    expect(result).toBe(expectedURL);
  });

  // it('should throw an error if environment variables are missing', () => {
  //   delete process.env.CALLBACK_URL;
  //   delete process.env.APP_KEY;

  //   expect(() => {
  //     LazadaAPI.auth.authURL();
  //   }).toThrow('Missing Environment variables');
  // });
});

describe('Generate Access Token', () => {
  it('should return access token', async () => {
    const code = '';
    const result = await LazadaAPI.api.GenerateAccessToken({ code: code });
    expect('access_token' in result || 'message' in result).toBeTruthy();
  });
});

describe('Get Route', () => {
  it('should return seller info.', async () => {
    const result = await LazadaAPI.api.GetRequest({
      accessToken: process.env.ACCESS_TOKEN as string,
      route: '/seller/get',
    });
    console.log(result);
    expect('short_code' in result).toBeTruthy();
  });
});

describe('Post Route', () => {
  it('should return access token', async () => {
    const result = await LazadaAPI.api.PostRequest({
      accessToken: process.env.ACCESS_TOKEN as string,
      route: '/order/shipment/providers/get',
      parameters: {
        getShipmentProvidersReq: JSON.stringify({
          orders: [
            {
              order_id: 739917526256613,
              order_item_ids: [739917526356613],
            },
          ],
        }),
      },
    });
    expect('code' in result).toBeTruthy();
  });
});
