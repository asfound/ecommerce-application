import type { ModalService } from '~/services/modal/modal.service';

import { a, div, h3, img, li, p, ul } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { PROFILE_CARD_TEXT } from './constants';
import styles from './profile-card.module.css';

export interface ProfileCardProperties {
  avatarUrl: string;
  bio: string;
  contributions: string[] | undefined;
  fullname: string;
  github: { login: string; url: string };
  roles: string[];
}

export class ProfileCard extends BaseComponent implements Component {
  private githubElement!: HTMLAnchorElement;

  private readonly modalService: ModalService;

  private readonly properties: ProfileCardProperties;

  public constructor(properties: ProfileCardProperties, modalService: ModalService) {
    super({ className: styles.card, tagName: 'div' });

    this.properties = properties;

    this.modalService = modalService;

    this.createHTML();

    this.setupListeners();
  }

  public createHTML(): void {
    const fullnameElement = h3({ className: styles.fullname }, this.properties.fullname);

    const imageElement = img({
      alt: this.properties.fullname,
      className: styles.image,
      src: this.properties.avatarUrl,
    });

    this.githubElement = a(
      { className: styles.githubLink, href: this.properties.github.url, target: '_blank' },
      '@' + this.properties.github.login,
    );

    const readMoreElement = div({ className: styles.readMore }, PROFILE_CARD_TEXT.READ_MORE);

    const outerContent = div(
      { className: styles.outerContent },
      fullnameElement,
      this.githubElement,
      readMoreElement,
    );

    this.append(imageElement, outerContent);
  }

  private createModalContent(): HTMLDivElement {
    const fullNameElement = h3({ className: styles.fullname }, this.properties.fullname);

    const rolesElement = ul(
      { className: styles.roles },
      ...this.properties.roles.map((role) => li(null, role)),
    );

    const rolesContainer = div(null, h3(null, PROFILE_CARD_TEXT.TITLE_ROLES), rolesElement);

    const bioContainer = div(
      null,
      h3(null, PROFILE_CARD_TEXT.TITLE_BIO),
      p(null, this.properties.bio),
    );

    return div(
      { className: styles.modalContent },
      fullNameElement,
      rolesContainer,
      bioContainer,
      this.properties.contributions
        ? div(
            null,
            h3(null, PROFILE_CARD_TEXT.TITLE_CONTRIBUTION),
            ul(null, ...this.properties.contributions.map((item) => li(null, item))),
          )
        : null,
    );
  }

  private setupListeners(): void {
    this.addListener('click', (event) => {
      if (event.target !== this.githubElement) {
        this.modalService.open({ content: this.createModalContent() });
      }
    });
  }
}
