import { routerSelector } from '~/app/router/store/selectors';
import { routerStore } from '~/app/router/store/store';
import { BaseComponent } from '~/components/base-component/base-component';
import { h1, h2 } from '~/shared/create-element/tags';

export class ProductDetailsPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const searchParameters = routerStore.select(routerSelector.selectSearchParameters);

    this.append(h1(null, 'Product Details'));
    this.append(h2(null, `Product name: ${searchParameters.name}`));
    this.append(h2(null, `Product SKU: ${searchParameters.sku}`));
  }
}
