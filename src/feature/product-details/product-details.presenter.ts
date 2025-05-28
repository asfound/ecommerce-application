import type { ProductsService } from '~/api/services/products/products.service';
import type { BreadcrumbItem } from '~/components/breadcrumbs/breadcrumbs';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { routerAction } from '~/app/router/store/actions';
import { routerSelector } from '~/app/router/store/selectors';
import { routerStore } from '~/app/router/store/store';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { Presenter } from '~/shared/presenter/presenter';

import type { ProductDetailsView } from './product-details.view';

import { catalogCategoryNameAction } from '../catalog/store/actions';
import { catalogStore } from '../catalog/store/store';
import { NOT_FOUND_MESSAGE } from './constants';

export class ProductDetailsPresenter extends Presenter<ProductDetailsView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductDetailsView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView();
  }

  //TODO: remove magic strings
  private getBreadcrumbs(
    categories: { id: string; name: string }[],
    productName: string,
  ): BreadcrumbItem[] {
    return [
      {
        name: 'Main',
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.MAIN);
        },
      },
      {
        name: 'Catalog',
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.CATALOG);
        },
      },
      ...categories.map((category) => ({
        name: category.name,
        onClick: (): void => {
          catalogStore.setState({ categoryId: category.id, searchTerm: '' });
          catalogCategoryNameAction.setCategoryName(category.name);
          Router.instance.navigate(ROUTE_PATH.CATALOG);
        },
      })),
      {
        name: productName,
      },
    ];
  }

  private readonly handleWeightChange = (sku: string): void => {
    routerAction.setAndReplaceSearchParameters({ sku });
  };

  private async updateView(): Promise<void> {
    const searchParameters = routerStore.select(routerSelector.selectSearchParameters);

    try {
      this.view.showLoader();

      const product = await this.productsService.getProductById(searchParameters.id);

      this.view.createHTML({
        currentSKU: searchParameters.sku,
        onWeightChange: this.handleWeightChange,
        product,
      });

      const breadcrumbs = new Breadcrumbs(this.getBreadcrumbs(product.categories, product.name));

      this.view.appendBreadcrumbs(breadcrumbs.element);
    } catch {
      this.view.showNotFoundWidget(NOT_FOUND_MESSAGE);
    } finally {
      this.view.scrollToTop();
      this.view.hideLoader();
    }
  }
}
