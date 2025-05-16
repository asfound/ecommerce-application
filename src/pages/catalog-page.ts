import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';

export class CatalogPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const heading = new BaseComponent({ tagName: 'h1', textContent: 'Catalog page' });

    this.append(heading);

    SERVICE_HUB.provideCategoriesService()
      .getCategories()
      .then(({ body }) => {
        console.warn(body);
      })
      .catch((error: unknown) => {
        console.warn(error);
      });
  }
}
