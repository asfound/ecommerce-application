import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { a, div, h1, p } from '~/shared/create-element/tags';

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

    const CTALink = a(
      {
        className: styles.cta,
        href: ROUTE_PATH.CATALOG,
        onClick: (event) => {
          event.preventDefault();
          Router.instance.navigate(ROUTE_PATH.CATALOG);
        },
        signal: this.abortController.signal,
      },
      CTA_TEXT.CTA,
    );

    const container = div({ className: styles.container }, heading, description, CTALink);

    const wrapperElement = div({ className: CSS_CLASS_NAME.WRAPPER }, container);

    this.append(wrapperElement);
  }
}
