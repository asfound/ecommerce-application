import { http, HttpResponse } from 'msw';

import { API_URL, AUTH_URL, PROJECT_KEY } from '../client/constants';

export const TOKEN_URL = `${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`;
export const ME_URL = `${API_URL}/${PROJECT_KEY}/me`;
export const LOGIN_URL = `${ME_URL}/login`;
export const SIGNUP_URL = `${ME_URL}/signup`;

const AUTH_SERVICE_HANDLERS = [
  http.post(TOKEN_URL, () => {
    return HttpResponse.json({ expirationTime: 100, refreshToken: '', token: '' });
  }),
  http.get(ME_URL, () => {
    return HttpResponse.json({ id: '123123123' });
  }),
  http.post(LOGIN_URL, () => {
    return HttpResponse.json();
  }),
];
export const handlers = [...AUTH_SERVICE_HANDLERS];
