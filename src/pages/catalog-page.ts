import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { ProductCard } from '~/components/product-card/product-card';
import { CategoryNavigationPresenter } from '~/feature/category-navigation/category-navigation.presenter';
import { CategoryNavigationView } from '~/feature/category-navigation/category-navigation.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

export class CatalogPage extends BaseComponent {
  private readonly categoryNavigationPresenter: CategoryNavigationPresenter;

  public constructor() {
    super({ className: CSS_CLASS_NAME.WRAPPER, tagName: 'div' });

    this.categoryNavigationPresenter = new CategoryNavigationPresenter(
      new CategoryNavigationView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    const PC = new ProductCard({
      description:
        'Smooth yet intense, this blend offers deep caramel sweetness, hints of dark cherry, and a velvety crema. Ideal for milk-based espresso drinks. 100% Arabica from Brazil and Ethiopia. A roast that marries depth with elegance.',
      image: { label: 'aa', url: 'https://placehold.co/400' },
      name: 'Velvet Forge',
      price: { default: 25_000 },
      sku: 'asddasdas',
    });

    SERVICE_HUB.provideProductsService()
      .getProducts({ limit: 10 })
      .then((response) => {
        console.warn(response);
      });

    this.append(this.categoryNavigationPresenter.getView(), PC);
  }

  public override destroy(): void {
    this.categoryNavigationPresenter.destroy();

    super.destroy();
  }
}
