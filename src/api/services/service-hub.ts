import { getApiRoot } from '../helpers/helpers';
import { AuthService } from './auth/auth.service';

export const SERVICE_HUB = {
  provideAuthService() {
    return AuthService.getInstance(getApiRoot);
  },
} as const;
