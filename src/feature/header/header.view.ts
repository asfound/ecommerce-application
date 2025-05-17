import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { ROUTER_LINKS } from '~/app/router/router-links';
import accountSvg from '~/assets/icons/account.svg';
import cartSvg from '~/assets/icons/cart.svg';
import logoutSvg from '~/assets/icons/logout.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { Logo } from '~/components/logo/logo';
import { Navigation } from '~/components/navigation/navigation';
import navigationStyles from '~/components/navigation/navigation.module.css';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { a, div, span } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { debounce } from '~/shared/utils/debounce';

import {
  BURGER_DEBOUNCE_THRESHOLD,
  HEADER_ICON_TEXT,
  HEADER_LAYOUT_CHANGE_BREAKPOINT,
} from './constants';
import styles from './header.module.css';

export class HeaderView extends BaseComponent implements Component {
  private isBurgerMenuOpen = false;

  private readonly logoLink = a({
    className: styles.logoLink,
    href: ROUTE_PATH.MAIN,
    id: 'header',
  });

  private readonly logoutIcon = div(
    { className: styles.iconContainer },
    createSvgIcon(logoutSvg, styles.icon),
    span({ className: styles.iconText }, HEADER_ICON_TEXT.LOGOUT),
  );

  private readonly menuIcon = div({ className: styles.burger });

  private readonly navigation = new Navigation(ROUTER_LINKS);

  private readonly profileIcon = div(
    { className: styles.iconContainer },
    createSvgIcon(accountSvg, styles.icon),
    span({ className: styles.iconText }, HEADER_ICON_TEXT.PROFILE),
  );

  public constructor() {
    super({ className: styles.header, tagName: 'header' });

    this.createHTML();

    this.setupListeners();
  }

  public bindLogoClickHandler(handler: VoidFunction): void {
    this.logoLink.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public bindLogoutHandler(handler: VoidFunction): void {
    this.logoutIcon.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public bindProfileClickHandler(handler: VoidFunction): void {
    this.profileIcon.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public createHTML(): void {
    const logoElement = new Logo();
    this.logoLink.append(logoElement.element);

    this.navigation.addClassNames(styles.navigation);
    this.navigation.addLinkClickHandler(() => {
      this.closeMenu();
    });

    const cartIcon = div(
      { className: styles.iconContainer },
      createSvgIcon(cartSvg, styles.icon),
      span({ className: styles.iconText }, HEADER_ICON_TEXT.CART),
    );

    const iconsContainer = div(
      { className: styles.iconsContainer },
      cartIcon,
      this.profileIcon,
      this.logoutIcon,
      this.menuIcon,
    );

    const wrapperElement = div(
      { className: [CSS_CLASS_NAME.WRAPPER, styles.wrapper] },
      this.logoLink,
      this.navigation.element,
      iconsContainer,
    );

    this.append(wrapperElement);
  }

  public setLogoutIconVisible(isVisible: boolean): void {
    this.logoutIcon.classList.toggle(styles.hidden, !isVisible);
  }

  public setProfileIconVisible(isVisible: boolean): void {
    this.profileIcon.classList.toggle(styles.hidden, !isVisible);
  }

  private closeMenu(): void {
    if (this.isBurgerMenuOpen) {
      this.navigation.element.classList.remove(navigationStyles.shown);
      this.menuIcon.classList.remove(styles.active);
      document.body.classList.remove(CSS_CLASS_NAME.NO_SCROLL);
      this.isBurgerMenuOpen = false;
    }
  }

  private setupListeners(): void {
    this.menuIcon.addEventListener(
      'click',
      () => {
        this.navigation.element.classList.toggle(navigationStyles.shown);
        this.menuIcon.classList.toggle(styles.active);
        document.body.classList.toggle(CSS_CLASS_NAME.NO_SCROLL);
        this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
      },
      { signal: this.abortController.signal },
    );

    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth > HEADER_LAYOUT_CHANGE_BREAKPOINT) {
          this.closeMenu();
        }
      }, BURGER_DEBOUNCE_THRESHOLD),
    );

    document.addEventListener('click', (event) => {
      if (
        event.target instanceof Node &&
        !this.navigation.element.contains(event.target) &&
        !this.menuIcon.contains(event.target)
      ) {
        this.closeMenu();
      }
    });
  }
}
