import { isError } from 'lodash';

import type { CartService } from '~/api/services/cart/cart.service';
import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct, AppProductWithInCart } from '~/api/services/products/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
import { Presenter } from '~/shared/presenter/presenter';
import { formatProductName } from '~/shared/utils/format-product-name';
import { showToast } from '~/shared/utils/show-toast';

import type { SliderBestsellersView } from './slider-bestsellers.view';

import { PRODUCT_CART_NOTIFICATION } from '../catalog/constants';
import { PRODUCT_QUANTITY, PRODUCTS_FILTER_PAYLOAD, SLIDER_BESTSELLER_ERROR } from './constants';

export class SliderBestsellersPresenter extends Presenter<SliderBestsellersView> {
  private readonly cartService: CartService;

  private readonly productsService: ProductsService;

  public constructor(
    view: SliderBestsellersView,
    productsService: ProductsService,
    cartService: CartService,
  ) {
    super(view);

    this.productsService = productsService;

    this.cartService = cartService;

    this.initView();
  }

  public async initView(): Promise<void> {
    try {
      const products = await this.getMarkedProducts();

      this.view.createHTML(products, {
        onAddToCart: this.handleAddToCart,
        onNavigateToDetails: this.handleNavigateToDetails,
      });

      this.view.bindSeeAllHandler(this.handleSeeAllClick, ROUTE_PATH.CATALOG);
    } catch (error) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  }

  private async getMarkedProducts(): Promise<AppProductWithInCart[]> {
    try {
      const [data, skuSet] = await Promise.all([
        this.productsService.getFilteredProducts(PRODUCTS_FILTER_PAYLOAD),
        this.cartService.getProductsSkuSet(),
      ]);

      return data.products.map((product) =>
        this.productsService.markProductWithInCart(product, skuSet),
      );
    } catch {
      throw new Error(SLIDER_BESTSELLER_ERROR.FAILED_TO_LOAD);
    }
  }

  private handleAddToCart = async (product: AppProductWithInCart): Promise<void> => {
    const productName = formatProductName(product);

    try {
      const result = await this.cartService.addLineItem({
        lineItemKey: product.sku,
        quantity: PRODUCT_QUANTITY,
        sku: product.sku,
      });

      rootAction.setProductsCount(result.body.totalLineItemQuantity ?? 0);

      showToast(PRODUCT_CART_NOTIFICATION.ADDED_TO_CART(productName));
    } catch {
      showToast(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName), true);
      throw new Error(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName));
    }
  };

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, {
      searchParameters: {
        id: product.productId,
        sku: product.sku,
      },
    });
  };

  private readonly handleSeeAllClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.CATALOG);
  };
}
