import { BaseComponent } from '~/components/base-component/base-component';
import { ProfileCard } from '~/components/profile-card/profile-card';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { TEAM_DATA } from '~/shared/constants/team-data';
import { div, h2 } from '~/shared/create-element/tags';

import styles from './about-us.module.css';

export class AboutUsPage extends BaseComponent {
  public constructor() {
    super({ className: ['ABOUT-US', CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    const titleTeam = h2({ className: styles.title }, 'Huh-Team');

    const memberCards = div(
      { className: styles.cards },
      ...TEAM_DATA.MEMBERS.map((member) => new ProfileCard(member).element),
    );

    const titleSupport = h2({ className: styles.title }, 'Special thanks');

    const supportCards = div(
      { className: styles.cards },
      ...TEAM_DATA.EXTERNAL_SUPPORT.map((member) => new ProfileCard(member).element),
    );

    this.append(titleTeam, memberCards, titleSupport, supportCards);
  }
}
