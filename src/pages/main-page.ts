import { SERVICE_PROVIDER } from '~/api/services/service-provider';
import { BaseComponent } from '~/components/base-component/base-component';
import { DiscountCodesPresenter } from '~/feature/discount-codes/discount-codes.presenter';
import { DiscountCodesView } from '~/feature/discount-codes/discount-codes.view';
import { HeroBanner } from '~/feature/hero-banner/hero-banner';
import { SliderBestsellersPresenter } from '~/feature/slider-bestsellers/slider-bestsellers.presenter';
import { SliderBestsellersView } from '~/feature/slider-bestsellers/slider-bestsellers.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div } from '~/shared/create-element/tags';

export class MainPage extends BaseComponent {
  private readonly discountCodesPresenter: DiscountCodesPresenter;

  private readonly sliderBestsellersPresenter: SliderBestsellersPresenter;

  public constructor() {
    super({ tagName: 'main' });

    const heroBanner = new HeroBanner();

    this.sliderBestsellersPresenter = new SliderBestsellersPresenter(
      new SliderBestsellersView(),
      SERVICE_PROVIDER.provideProductsService(),
      SERVICE_PROVIDER.provideCartService(),
    );

    this.discountCodesPresenter = new DiscountCodesPresenter(
      new DiscountCodesView(),
      SERVICE_PROVIDER.provideDiscountCodesService(),
    );

    this.append(
      heroBanner,

      div({ className: CSS_CLASS_NAME.WRAPPER }, this.sliderBestsellersPresenter.getView().element),
      this.discountCodesPresenter.getView(),
    );
  }

  public override destroy(): void {
    this.discountCodesPresenter.destroy();
    this.sliderBestsellersPresenter.destroy();

    super.destroy();
  }
}
