import type { CartService } from '~/api/services/cart/cart.service';
import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProductCategory, AppProductWithInCart } from '~/api/services/products/types';
import type { BreadcrumbItem } from '~/components/breadcrumbs/breadcrumbs';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { routerAction } from '~/app/router/store/actions';
import { routerSelector } from '~/app/router/store/selectors';
import { routerStore } from '~/app/router/store/store';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { PAGE_NAME } from '~/shared/constants/constants';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { formatProductName } from '~/shared/utils/format-product-name';
import { showToast } from '~/shared/utils/show-toast';

import type { ProductDetailsView } from './product-details.view';

import { PRODUCT_CART_NOTIFICATION } from '../catalog/constants';
import { catalogCategoryNameAction } from '../catalog/store/actions';
import { catalogStore } from '../catalog/store/store';
import { NOT_FOUND_MESSAGE } from './constants';

const DEFAULT_QUANTITY = 1;

export class ProductDetailsPresenter extends Presenter<ProductDetailsView> {
  private readonly cartService: CartService;

  private readonly productsService: ProductsService;

  public constructor(
    view: ProductDetailsView,
    productsService: ProductsService,
    cartService: CartService,
  ) {
    super(view);

    this.productsService = productsService;

    this.cartService = cartService;

    this.updateView();
  }

  private getBreadcrumbs(categories: AppProductCategory[], productName: string): BreadcrumbItem[] {
    return [
      {
        name: PAGE_NAME.MAIN,
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.MAIN);
        },
      },
      {
        name: PAGE_NAME.CATALOG,
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.CATALOG);
        },
      },
      ...categories.map((category) => ({
        name: category.name,
        onClick: (): void => {
          this.handleCategoryClick(category);
        },
      })),
      {
        name: productName,
      },
    ];
  }

  private async getMarkedProduct(id: string): Promise<AppProductWithInCart> {
    try {
      const [product, skuSet] = await Promise.all([
        this.productsService.getProductById(id),
        this.cartService.getProductsSkuSet(),
      ]);

      return this.productsService.markProductWithInCart(product, skuSet);
    } catch {
      throw new Error(NOT_FOUND_MESSAGE);
    }
  }

  private handleAddToCart = async (product: AppProductWithInCart): Promise<void> => {
    const productName = formatProductName(product);

    try {
      await this.cartService.addLineItem({
        lineItemKey: product.sku,
        quantity: DEFAULT_QUANTITY,
        sku: product.sku,
      });

      showToast(PRODUCT_CART_NOTIFICATION.ADDED_TO_CART(productName));
    } catch {
      showToast(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName), true);
      throw new Error(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName));
    }
  };

  private handleCategoryClick(category: AppProductCategory): void {
    catalogStore.setState({ categoryId: category.id, searchTerm: '' });
    catalogCategoryNameAction.setCategoryName(category.name);
    Router.instance.navigate(ROUTE_PATH.CATALOG);
  }

  private handleRemoveFromCart = async (product: AppProductWithInCart): Promise<void> => {
    const productName = formatProductName(product);

    try {
      await this.cartService.removeLineItem({ lineItemKey: product.sku });

      showToast(PRODUCT_CART_NOTIFICATION.REMOVED_FROM_CART(productName));
    } catch {
      showToast(PRODUCT_CART_NOTIFICATION.FAILED_REMOVE_FROM_CART(productName), true);

      throw new Error(PRODUCT_CART_NOTIFICATION.FAILED_REMOVE_FROM_CART(productName));
    }
  };

  private readonly handleWeightChange = (sku: string): void => {
    routerAction.setAndReplaceSearchParameters({ sku });
  };

  private async updateView(): Promise<void> {
    const searchParameters = routerStore.select(routerSelector.selectSearchParameters);

    try {
      this.view.showLoader();

      const product = await this.getMarkedProduct(searchParameters.id);

      this.view.createHTML({
        currentSKU: searchParameters.sku,
        onAddToCart: this.handleAddToCart,
        onRemoveFromCart: this.handleRemoveFromCart,
        onWeightChange: this.handleWeightChange,
        product,
      });

      const breadcrumbs = new Breadcrumbs(this.getBreadcrumbs(product.categories, product.name));

      this.view.appendBreadcrumbs(breadcrumbs.element);
    } catch (error: unknown) {
      if (isError(error)) {
        this.view.showNotFoundWidget(error.message);
      }
    } finally {
      this.view.scrollToTop();
      this.view.hideLoader();
    }
  }
}
