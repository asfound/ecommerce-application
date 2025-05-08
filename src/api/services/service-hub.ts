import { localStorageService } from '~/services/browser-storage/browser-storage.service';

import { getApiRoot } from '../helpers/helpers';
import { AuthService } from './auth/auth.service';

export const SERVICE_HUB = {
  provideAuthService() {
    return AuthService.getInstance(getApiRoot, localStorageService);
  },
} as const;
