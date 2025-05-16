import { ApiBuilder } from '~/api/client/api-builder';

import { SERVICE_HUB } from '../../service-hub';

ApiBuilder.instance.useAnonymousBuilder();

const authService = SERVICE_HUB.provideAuthService();

test('login', async (): Promise<void> => {
  const response = await authService.login({
    email: 'test@test.com',
    password: 'test',
  });
  expect(response).not.toBeNull();
});
