export interface LazadaUserTokenInfo {
    access_token: string;
    country: string;
    refresh_token: string;
    account_id: string;
    code: string;
    account_platform: string;
    refresh_expires_in: string;
    country_user_info: LazadaCountryUserInfo[];
    expires_in: string;
    request_id: string;
    account: string;
  }

interface LazadaCountryUserInfo {
    country: string;
    user_id: string;
    seller_id: string;
    short_code: string;
  }