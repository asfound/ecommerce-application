import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { ProductCardClickHandler } from '~/components/product-card/product-card';

import huhGif from '~/assets/img/huh-cat.gif';
import { BaseComponent } from '~/components/base-component/base-component';
import { Loader } from '~/components/common/loader/loader';
import { ProductCard } from '~/components/product-card/product-card';
import { div, img, p } from '~/shared/create-element/tags';

import { PRODUCT_CARD_LIST_TEXT } from './constants';
import styles from './product-card-list.module.css';

export class ProductCardListView extends BaseComponent implements Component {
  private readonly loaderComponent = new Loader({ size: 'medium' });

  private readonly notFoundHeading = p({ className: styles.notFoundDescription });

  private readonly notFoundWidget = div(
    { className: styles.notFoundWidget },
    img({ className: styles.notFoundGif, src: huhGif }),
    this.notFoundHeading,
  );

  public constructor() {
    super({ className: styles.list, tagName: 'ul' });
  }

  public createHTML(products: AppProduct[], onNavigateToDetails: ProductCardClickHandler): void {
    this.replaceChildren(
      ...products.map((product) => new ProductCard(product, onNavigateToDetails)),
    );
  }

  public hideLoader(): void {
    this.loaderComponent.hide();
  }

  public showLoader(): void {
    this.replaceChildren(this.loaderComponent);
    this.loaderComponent.show();
  }

  public showNotFoundWidget(searchTerm: string): void {
    this.notFoundHeading.textContent = PRODUCT_CARD_LIST_TEXT.NOT_FOUND(searchTerm);
    this.replaceChildren(this.notFoundWidget);
  }
}
