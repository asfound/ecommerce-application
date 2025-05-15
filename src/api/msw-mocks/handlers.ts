import { http, HttpResponse } from 'msw';

import { API_URL, PROJECT_KEY } from '../client/constants';

export const TOKEN_URL =
  'https://auth.europe-west1.gcp.commercetools.com/oauth/huh-coffee-top/customers/token';

export const ME_URL = 'https://api.europe-west1.gcp.commercetools.com/huh-coffee-top/me';

export const LOGIN_URL = `${API_URL}/${PROJECT_KEY}/me/login`;
export const LOGIN_URL_RAW = `https://api.europe-west1.gcp.commercetools.com/huh-coffee-top/me/login`;

export const GOOGLE_URL = 'https://www.google.com/me/login';
export const SIGNUP_URL = `${API_URL}/${PROJECT_KEY}/me/signup`;

const AUTH_SERVICE_HANDLERS = [
  // http.post(LOGIN_URL, () => {
  //   return HttpResponse.json({ foo: 'foo', id: 1 });
  // }),
  http.post(LOGIN_URL_RAW, () => {
    console.warn('intercepted');
    return HttpResponse.json({ foo: 'raw', id: 1 });
  }),
  http.post(GOOGLE_URL, () => {
    return HttpResponse.json({ google: 'google' });
  }),
  http.post(TOKEN_URL, () => {
    return HttpResponse.json({ expirationTime: 100, refreshToken: '', token: '' });
  }),
  http.get(ME_URL, () => {
    return HttpResponse.json({ id: '123123123' });
  }),
];
export const handlers = [...AUTH_SERVICE_HANDLERS];
