import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { h1 } from '~/shared/create-element/tags';

export class AboutUsPage extends BaseComponent {
  public constructor() {
    super({ className: ['ABOUT-US', CSS_CLASS_NAME.WRAPPER], tagName: 'div' });

    const title = h1(null, 'About us');
    this.append(title);
  }
}
