import iconRS from '~/assets/icons/rss-logo.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { ProfileCard } from '~/components/profile-card/profile-card';
import { modalService } from '~/services/modal/modal.service';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { TEAM_DATA } from '~/shared/constants/team-data';
import { a, div, h2 } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import styles from './about-us.module.css';

export class AboutUsPage extends BaseComponent {
  public constructor() {
    super({ className: ['ABOUT-US', CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    const titleTeam = h2({ className: styles.title }, 'Huh-Team');

    const memberCards = div(
      { className: styles.cards },
      ...TEAM_DATA.MEMBERS.map((member) => new ProfileCard(member, modalService).element),
    );

    const titleSupport = h2({ className: styles.title }, 'Special thanks');

    const supportCards = div(
      { className: styles.cards },
      ...TEAM_DATA.EXTERNAL_SUPPORT.map((member) => new ProfileCard(member, modalService).element),
    );

    const titleRSSchool = h2({ className: styles.title }, 'RS-School');

    const rsschoolLink = a(
      { className: styles.rsLink, href: 'https://rs.school/', target: '_blank' },
      createSvgIcon(iconRS, styles.rsIcon),
    );

    this.append(
      titleTeam,
      memberCards,
      titleSupport,
      supportCards,
      modalService.getView(),
      titleRSSchool,
      rsschoolLink,
    );
  }
}
