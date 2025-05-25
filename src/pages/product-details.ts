import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { ProductDetailsPresenter } from '~/feature/product-details/product-details.presenter';
import { ProductDetailsView } from '~/feature/product-details/product-details.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

export class ProductDetailsPage extends BaseComponent {
  private readonly productDetailsPresenter: ProductDetailsPresenter;

  public constructor() {
    super({ className: CSS_CLASS_NAME.WRAPPER, tagName: 'div' });

    this.productDetailsPresenter = new ProductDetailsPresenter(
      new ProductDetailsView(),
      SERVICE_HUB.provideProductsService(),
    );

    this.append(this.productDetailsPresenter.getView());
  }

  public override destroy(): void {
    this.productDetailsPresenter.destroy();

    super.destroy();
  }
}
