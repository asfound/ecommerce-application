import type { Component } from '~/components/base-component/types';

import { RouterLink } from '~/app/router/components/router-link';
import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';
import { div, h1, p } from '~/shared/create-element/tags';

import styles from './hero-banner.module.css';

// should be moved to constants?
const CTA_TEXT = {
  CTA: 'Shop now',
  DESCRIPTION: 'Great gift for yourself and loved ones',
  HEADING: 'From bean to brew — find your flavour',
};

export class HeroBanner extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.banner, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const heading = h1({ className: styles.heading }, CTA_TEXT.HEADING);
    const description = p({ className: styles.description }, CTA_TEXT.DESCRIPTION);

    const CTALink = new RouterLink({ path: ROUTE_PATH.CATALOG, textContent: CTA_TEXT.CTA });
    CTALink.addClassNames(styles.cta);

    const container = div({ className: styles.container }, heading, description, CTALink.element);

    this.append(container);
  }
}
