import { ApiBuilder } from '~/api/client/api-builder';
import { LOGIN_URL_RAW } from '~/api/msw-mocks/handlers';

import { SERVICE_HUB } from '../../service-hub';

ApiBuilder.instance.useAnonymousBuilder();

const authService = SERVICE_HUB.provideAuthService();
console.warn(authService);

test('SDK', async (): Promise<void> => {
  // const response = await authService.login({
  //   email: 'test@test.com',
  //   password: 'test',
  // });
  // console.warn(response);
  const r = await globalThis.fetch(LOGIN_URL_RAW, { method: 'POST' });
  const d: unknown = await r.json();
  console.warn(d);
});

test('google', async () => {
  // const r = await globalThis.fetch(GOOGLE_URL, { method: 'POST' });
  // const d: unknown = await r.json();
  // console.warn(d);
});
