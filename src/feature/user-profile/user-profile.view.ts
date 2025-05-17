import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';

export class UserProfileView extends BaseComponent implements Component {
  public constructor() {
    super({ tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    console.warn('user profile');
  }
}
