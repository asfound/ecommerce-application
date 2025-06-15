import { ApiBuilder } from '~/api/client/api-builder';

import { SERVICE_PROVIDER } from '../../service-provider';

ApiBuilder.instance.useAnonymousBuilder();

const authService = SERVICE_PROVIDER.provideAuthService();

test.skip('login', async (): Promise<void> => {
  const response = await authService.login({
    email: 'test@test.com',
    password: 'test',
  });
  expect(response).not.toBeNull();
});
