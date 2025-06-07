import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { HeroBanner } from '~/feature/hero-banner/hero-banner';
import { SliderBestsellersPresenter } from '~/feature/slider-bestsellers/slider-bestsellers.presenter';
import { SliderBestsellersView } from '~/feature/slider-bestsellers/slider-bestsellers.view';

export class MainPage extends BaseComponent {
  private readonly sliderBestsellersPresenter: SliderBestsellersPresenter;

  public constructor() {
    super({ tagName: 'main' });

    const heroBanner = new HeroBanner();

    this.sliderBestsellersPresenter = new SliderBestsellersPresenter(
      new SliderBestsellersView(),
      SERVICE_HUB.provideProductsService(),
      SERVICE_HUB.provideCartService(),
    );

    this.append(heroBanner, this.sliderBestsellersPresenter.getView());
  }
}
