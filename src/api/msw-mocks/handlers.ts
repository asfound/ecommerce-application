import { http, HttpResponse } from 'msw';

import { API_URL, PROJECT_KEY } from '../client/constants';

export const LOGIN_URL = `${API_URL}/${PROJECT_KEY}/me/login`;
export const SIGNUP_URL = `${API_URL}/${PROJECT_KEY}/me/signup`;

const AUTH_SERVICE_HANDLERS = [
  http.post(LOGIN_URL, () => {
    return HttpResponse.json({ foo: 'foo', id: 1 });
  }),
];
export const handlers = [...AUTH_SERVICE_HANDLERS];
