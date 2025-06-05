import type { LineItem } from '@commercetools/platform-sdk';

import type { CartService } from '~/api/services/cart/cart.service';
import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct } from '~/api/services/products/types';

import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { CartItemsListView } from './cart-items-list.view';

//TODO: move somewhere?
export type CartProduct = AppProduct & {
  lineItemKey: string;
  quantity: number;
};

export class CartItemsListPresenter extends Presenter<CartItemsListView> {
  private readonly cartService: CartService;

  private readonly productsService: ProductsService;

  public constructor(
    view: CartItemsListView,
    cartService: CartService,
    productsService: ProductsService,
  ) {
    super(view);

    this.cartService = cartService;
    this.productsService = productsService;

    this.initView();
  }

  private async initView(): Promise<void> {
    try {
      this.view.showLoader();

      const cart = await this.cartService.getCurrentCart();
      const products = await this.loadProductsFromCart(cart.body.lineItems);

      this.view.createHTML(products);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    } finally {
      this.view.hideLoader();
    }
  }

  private async loadProductsFromCart(lineItems: LineItem[]): Promise<CartProduct[]> {
    return Promise.all(lineItems.map((item) => this.mapLineItemToCartProduct(item)));
  }

  private async mapLineItemToCartProduct(item: LineItem): Promise<CartProduct> {
    const product = await this.productsService.getProductById(item.productId);

    const variant = product.variants.find((v) => v.sku === item.variant.sku) ?? product;

    return {
      ...variant,
      lineItemKey: item.id,
      quantity: item.quantity,
    };
  }
}
