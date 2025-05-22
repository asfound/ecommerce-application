import type {} from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserProfileView } from './user-profile.view';

export class UserProfilePresenter extends Presenter<UserProfileView> {
  public constructor(view: UserProfileView) {
    super(view);
  }
}
