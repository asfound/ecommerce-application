import { localStorageService } from '~/services';

import { getApiRoot } from '../helpers/helpers';
import { AuthService } from './auth/auth.service';
import { CustomerService } from './customer/customer.service';

export const SERVICE_HUB = {
  provideAuthService() {
    return AuthService.getInstance(getApiRoot, localStorageService);
  },
  provideCustomerService() {
    return CustomerService.getInstance(getApiRoot);
  },
} as const;
