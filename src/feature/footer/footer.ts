import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { InputText } from '~/components/common/input/input-text/input-text';
import { Logo } from '~/components/logo/logo';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { SUBSCRIPTION_EMAIL_PROPS } from '~/shared/constants/input-properties';
import { a, div, li, p, span, ul } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { showToast } from '~/shared/utils/show-toast';

import {
  ACCOUNT_LINKS_TEXT,
  CARE_LINKS_TEXT,
  CONTACT_LINKS,
  FOOTER_INFO,
  HELP_LINKS_TEXT,
  SOCIAL_LINKS,
  SUBSCRIPTION_SUCCESS,
} from './constants';
import styles from './footer.module.css';

export class Footer extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.footer, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const iconsBlock = this.createIconsBlock();

    const informationBlock = this.createInformationBlock();

    const copyrightInfo = div({}, FOOTER_INFO.COPYRIGHT.CREDITS);
    const policy = div({}, FOOTER_INFO.COPYRIGHT.POLICY);
    const terms = div({}, FOOTER_INFO.COPYRIGHT.TERMS);

    const copyrightBlock = div({ className: styles.copyright }, copyrightInfo, policy, terms);

    const wrapperElement = div(
      { className: [CSS_CLASS_NAME.WRAPPER, styles.wrapper] },
      iconsBlock,
      informationBlock,
      copyrightBlock,
    );

    this.append(wrapperElement);
  }

  private createCredentialsSection(): HTMLDivElement {
    const credentialsDescription = p(
      { className: styles.description },
      FOOTER_INFO.CREDENTIALS.DESCRIPTION,
    );

    const contactsList = ul(
      { className: styles.list },
      ...CONTACT_LINKS.map(({ href, icon, text }) =>
        li(
          { className: styles.listItem },
          a(
            { className: [styles.link, styles.contact], href, target: '_blank' },
            createSvgIcon(icon, styles.contactIcon),
            span({}, text),
          ),
        ),
      ),
    );

    return div(
      { className: [styles.credentials, styles.list] },
      new Logo().element,
      credentialsDescription,
      contactsList,
    );
  }

  private createIconsBlock(): HTMLDivElement {
    return div(
      { className: styles.icons },
      ...SOCIAL_LINKS.map(({ href, icon }) =>
        a(
          { className: styles.link, href, target: '_blank' },
          createSvgIcon(icon, styles.socialIcon),
        ),
      ),
    );
  }

  private createInformationBlock(): HTMLDivElement {
    const credentialsSection = this.createCredentialsSection();

    const helpList = this.createList(FOOTER_INFO.LISTS.HELP, HELP_LINKS_TEXT);
    const accountList = this.createList(FOOTER_INFO.LISTS.ACCOUNT, ACCOUNT_LINKS_TEXT);
    const careList = this.createList(FOOTER_INFO.LISTS.CARE, CARE_LINKS_TEXT);

    const subscriptionSection = this.createSubscriptionSection();

    return div(
      { className: styles.information },
      credentialsSection,
      helpList,
      accountList,
      careList,
      subscriptionSection,
    );
  }

  private createList(title: string, items: Record<string, string>): HTMLUListElement {
    const listTitle = p({ className: styles.listTitle }, title);
    const list = ul({ className: styles.list }, listTitle);

    for (const text of Object.values(items)) {
      list.append(li({ className: styles.listItem }, text));
    }

    return list;
  }

  private createSubscriptionSection(): HTMLDivElement {
    const subscriptionTitle = p(
      { className: styles.subscriptionTitle },
      FOOTER_INFO.SUBSCRIPTION.TITLE,
    );
    const subscriptionDescription = p(
      { className: styles.description },
      FOOTER_INFO.SUBSCRIPTION.DESCRIPTION,
    );

    const emailInput = new InputText(SUBSCRIPTION_EMAIL_PROPS);
    emailInput.addClassNames(styles.input);

    const cta = p({ className: styles.cta }, FOOTER_INFO.SUBSCRIPTION.CTA);

    emailInput.addListener('input', () => {
      if (emailInput.validate()) {
        cta.classList.add(styles.visible);
      } else {
        cta.classList.remove(styles.visible);
      }
    });

    cta.addEventListener(
      'click',
      () => {
        emailInput.clear();
        showToast(SUBSCRIPTION_SUCCESS);
        cta.classList.remove(styles.visible);
      },
      { signal: this.abortController.signal },
    );

    return div(
      { className: [styles.subscription, styles.list] },
      subscriptionTitle,
      subscriptionDescription,
      emailInput.element,
      cta,
    );
  }
}
