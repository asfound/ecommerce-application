import type { Component } from '~/components/base-component/types';

import facebook from '~/assets/icons/facebook.svg';
import instagram from '~/assets/icons/instagram.svg';
import pinterest from '~/assets/icons/pinterest.svg';
import telegram from '~/assets/icons/telegram.svg';
import twitter from '~/assets/icons/twitter.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { Input } from '~/components/common/input/input';
import { Logo } from '~/components/logo/logo';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { SUBSCRIPTION_EMAIL_PROPS } from '~/shared/constants/input-properties';
import { a, div, li, p, ul } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { showToast } from '~/shared/utils/show-toast';

import styles from './footer.module.css';

export const FOOTER_INFO = {
  COPYRIGHT: {
    CREDITS: '© 2025 HUH Coffee',
    POLICY: 'Privacy policy',
    TERMS: 'Terms and conditions',
  },
  CREDENTIALS: {
    DESCRIPTION: 'Discover the richness of nature in our coffee products.',
    EMAIL: 'info@huh-coffee.top',
    LOCATION: 'London, United Kingdom',
    MOBILE: '+12 050 123 45 67',
  },
  LISTS: {
    ACCOUNT: 'My account',
    CARE: 'Customer care',
    HELP: 'Help',
  },
  SUBSCRIPTION: {
    CTA: 'Subscribe →',
    DESCRIPTION: 'Stay informed, subscribe to our newsletter now!',
    TITLE: 'Sign up for emails',
  },
};

export const HELP_LINKS_TEXT = {
  CONTACT: 'Contact us',
  FAQ: 'FAQ',
  SHIPPING: 'Shipping & Returns',
};

export const ACCOUNT_LINKS_TEXT = {
  ADDRESSES: 'Addresses',
  ORDER_STATUS: 'Order Status',
  WISHLIST: 'Wishlist',
};

export const CARE_LINKS_TEXT = {
  ABOUT: 'About us',
  BLOG: 'Blog',
};

export const SOCIAL_LINKS = [
  { href: 'https://facebook.com', icon: facebook },
  { href: 'https://pinterest.com', icon: pinterest },
  { href: 'https://telegram.com', icon: telegram },
  { href: 'https://instagram.com', icon: instagram },
  { href: 'https://twitter.com', icon: twitter },
];

export const SUBSCRIPTION_SUCCESS = "You've been successfully subscribed!";

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
    //add icons to these ones
    const mobile = li({ className: styles.listItem }, FOOTER_INFO.CREDENTIALS.MOBILE);
    const email = li({ className: styles.listItem }, FOOTER_INFO.CREDENTIALS.EMAIL);
    const location = li({ className: styles.listItem }, FOOTER_INFO.CREDENTIALS.LOCATION);
    const contactsList = ul({ className: styles.list }, mobile, email, location);
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

    const helpTitle = p({ className: styles.listTitle }, FOOTER_INFO.LISTS.HELP);
    const helpList = ul({ className: styles.list }, helpTitle);
    for (const text of Object.values(HELP_LINKS_TEXT)) {
      const liElement = li({ className: styles.listItem }, text);
      helpList.append(liElement);
    }

    const accountTitle = p({ className: styles.listTitle }, FOOTER_INFO.LISTS.ACCOUNT);
    const accountList = ul({ className: styles.list }, accountTitle);
    for (const text of Object.values(ACCOUNT_LINKS_TEXT)) {
      const liElement = li({ className: styles.listItem }, text);
      accountList.append(liElement);
    }

    const careTitle = p({ className: styles.listTitle }, FOOTER_INFO.LISTS.CARE);
    const caretList = ul({ className: styles.list }, careTitle);
    for (const text of Object.values(CARE_LINKS_TEXT)) {
      const liElement = li({ className: styles.listItem }, text);
      caretList.append(liElement);
    }

    const subscriptionSection = this.createSubscriptionSection();

    return div(
      { className: styles.information },
      credentialsSection,
      helpList,
      accountList,
      caretList,
      subscriptionSection,
    );
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
    const emailInput = new Input(SUBSCRIPTION_EMAIL_PROPS);
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
        emailInput.clearInput();
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
