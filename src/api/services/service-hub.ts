import { localStorageService } from '~/services';

import { getApiRoot } from '../helpers/helpers';
import { AuthService } from './auth/auth.service';
import { CategoriesService } from './categories/categories.service';
import { CustomerService } from './customer/customer.service';
import { ProductsService } from './products/products.service';

export const SERVICE_HUB = {
  provideAuthService() {
    return AuthService.getInstance(getApiRoot, localStorageService);
  },
  provideCategoriesService() {
    return CategoriesService.getInstance(getApiRoot);
  },
  provideCustomerService() {
    return CustomerService.getInstance(getApiRoot);
  },
  provideProductsService() {
    return ProductsService.getInstance(getApiRoot);
  },
} as const;
