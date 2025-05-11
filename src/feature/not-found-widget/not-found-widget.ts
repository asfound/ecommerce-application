import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import huhGif from '~/assets/img/huh-cat.gif';
import { BaseComponent } from '~/components/base-component/base-component';
import { a, h1, img, p } from '~/shared/create-element/tags';

import styles from './not-found-widget.module.css';

// should be moved to constants?
const NOT_FOUND_TEXT = {
  CODE: '404 — Page Not Found',
  DESCRIPTION: "Huh? \n The page you're looking for doesn't exist.",
  LINK: 'To main page',
};

export class NotFoundWidget extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.widget, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const heading = h1({ className: styles.heading }, NOT_FOUND_TEXT.CODE);
    const illustration = img({ className: styles.illustration, src: huhGif });
    const description = p({ className: styles.description }, NOT_FOUND_TEXT.DESCRIPTION);

    const toMainLink = a(
      {
        className: styles.cta,
        href: ROUTE_PATH.MAIN,
        onClick: (event) => {
          event.preventDefault();
          Router.instance.navigate(ROUTE_PATH.MAIN);
        },
        signal: this.abortController.signal,
      },
      NOT_FOUND_TEXT.LINK,
    );

    this.append(heading, illustration, description, toMainLink);
  }
}
