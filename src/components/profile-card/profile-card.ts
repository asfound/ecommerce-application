import type { ModalService } from '~/services/modal/modal.service';

import { div, h3, img, li, p, ul } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
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

    const outerContent = div({ className: styles.outerContent }, fullnameElement);

    this.append(imageElement, outerContent);
  }

  private createModalContent(): HTMLDivElement {
    const fullNameElement = h3({ className: styles.fullname }, this.properties.fullname);

    const rolesElement = ul(
      { className: styles.roles },
      ...this.properties.roles.map((role) => li(null, role)),
    );

    const rolesContainer = div(null, h3(null, 'Roles:'), rolesElement);

    const bioContainer = div(null, h3(null, 'Bio:'), p(null, this.properties.bio));

    return div(
      { className: styles.modalContent },
      fullNameElement,
      rolesContainer,
      bioContainer,
      this.properties.contributions
        ? div(
            null,
            h3(null, 'Contribution:'),
            ul(null, ...this.properties.contributions.map((item) => li(null, item))),
          )
        : null,
    );
  }

  private setupListeners(): void {
    this.addListener('click', () => {
      this.modalService.open({ content: this.createModalContent() });
    });
  }
}
