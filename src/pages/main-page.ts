import { BaseComponent } from '~/components/base-component/base-component';
import { HeroBanner } from '~/feature/hero-banner/hero-banner';

export class MainPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'main' });

    const heroBanner = new HeroBanner();

    this.append(heroBanner);
  }
}
