import { localStorageService } from '~/services';

import { getApiRoot } from '../helpers/helpers';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';
import { CategoriesService } from './categories/categories.service';
import { CustomerService } from './customer/customer.service';
import { DiscountCodesService } from './discount-codes/discount-codes.service';
import { ProductsService } from './products/products.service';

export const SERVICE_HUB = {
  provideAuthService() {
    return AuthService.getInstance(getApiRoot, localStorageService);
  },
  provideCartService() {
    return CartService.getInstance(getApiRoot);
  },
  provideCategoriesService() {
    return CategoriesService.getInstance(getApiRoot);
  },
  provideCustomerService() {
    return CustomerService.getInstance(getApiRoot, SERVICE_HUB.provideAuthService());
  },
  provideDiscountCodesService() {
    return DiscountCodesService.getInstance(getApiRoot);
  },
  provideProductsService() {
    return ProductsService.getInstance(getApiRoot);
  },
} as const;
