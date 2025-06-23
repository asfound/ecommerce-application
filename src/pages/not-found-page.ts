import { BaseComponent } from '~/components/base-component/base-component';
import { NotFoundWidget } from '~/feature/not-found-widget/not-found-widget';

export class NotFoundPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const content = new NotFoundWidget();

    this.append(content);
  }
}
