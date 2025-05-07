import { RouterLink, type RouterLinkProperties } from '~/app/router/components/router-link';

import { BaseComponent } from '../base-component/base-component';

export class Navigation extends BaseComponent {
  public constructor(links: RouterLinkProperties[]) {
    super({ tagName: 'nav' });

    this.append(...links.map((link) => new RouterLink(link)));
  }
}
