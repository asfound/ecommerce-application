import { http, HttpResponse } from 'msw';

import { API_URL, PROJECT_KEY } from '../client/constants';

export const LOGIN_URL = `${API_URL}/${PROJECT_KEY}/me/login`;
export const LOGIN_URL_RAW = `https://api.europe-west1.gcp.commercetools.com/huh-coffee-top/me/login`;

export const GOOGLE_URL = 'https://www.google.com/me/login';
export const SIGNUP_URL = `${API_URL}/${PROJECT_KEY}/me/signup`;

const AUTH_SERVICE_HANDLERS = [
  // http.post(LOGIN_URL, () => {
  //   return HttpResponse.json({ foo: 'foo', id: 1 });
  // }),
  http.post(LOGIN_URL_RAW, () => {
    return HttpResponse.json({ foo: 'raw', id: 1 });
  }),
  http.post(GOOGLE_URL, () => {
    return HttpResponse.json({ google: 'google' });
  }),
];
export const handlers = [...AUTH_SERVICE_HANDLERS];
