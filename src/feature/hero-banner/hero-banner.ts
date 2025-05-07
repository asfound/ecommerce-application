import type { Component } from '~/components/base-component/types';

import { RouterLink } from '~/app/router/components/router-link';
import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';

import styles from './hero-banner.module.css';

export class HeroBanner extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.banner, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const container = new BaseComponent({
      className: styles.container,
      tagName: 'div',
    });

    const heading = new BaseComponent({
      className: styles.heading,
      tagName: 'h1',
      textContent: 'From bean to brew — find your flavour',
    });

    const description = new BaseComponent({
      className: styles.description,
      tagName: 'p',
      textContent: 'Great gift for yourself and loved ones',
    });

    const CTALink = this.createCTALink();

    container.append(heading, description, CTALink);

    this.append(container);
  }

  private createCTALink(): RouterLink {
    const link = new RouterLink({ path: ROUTE_PATH.CATALOG, textContent: 'Shop now' });
    link.element.classList.add(styles.cta);

    return link;
  }
}
