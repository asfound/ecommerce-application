import type { Component } from '~/components/base-component/types';

import { RouterLink } from '~/app/router/components/router-link';
import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';
import { div, h1, p } from '~/shared/create-element/tags';

import styles from './hero-banner.module.css';

export class HeroBanner extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.banner, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const container = div({
      className: styles.container,
    });

    const heading = h1(
      {
        className: styles.heading,
      },
      'From bean to brew — find your flavour',
    );

    const description = p(
      {
        className: styles.description,
      },
      'Great gift for yourself and loved ones',
    );

    const CTALink = new RouterLink({ path: ROUTE_PATH.CATALOG, textContent: 'Shop now' });
    CTALink.addClassNames(styles.cta);

    container.append(heading, description, CTALink.element);

    this.append(container);
  }
}
