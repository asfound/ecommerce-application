import { Presenter } from '~/shared/presenter/presenter';

import type { ProfileNavigationView } from './profile-navigation.view';

export class ProfileNavigationPresenter extends Presenter<ProfileNavigationView> {
  public constructor(view: ProfileNavigationView) {
    super(view);
  }
}
