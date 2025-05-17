import { BaseComponent } from '~/components/base-component/base-component';
import { h1 } from '~/shared/create-element/tags';

export class UserProfilePage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const content = h1(null, 'User Profile');

    this.append(content);
  }
}
