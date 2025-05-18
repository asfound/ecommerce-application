import type { AppCustomer } from '~/api/services/customer/types';

import { div, span } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './user-details.module.css';

export const FIELD_NAME = {
  BIRTHDAY: 'Birthday:',
  EMAIL: 'Email:',
  FIRST_NAME: 'First name:',
  LAST_NAME: 'Last name:',
};

export class UserDetails extends BaseComponent implements Component {
  private readonly userInformation: AppCustomer;

  public constructor(userInformation: AppCustomer) {
    super({ tagName: 'div' });

    this.userInformation = userInformation;

    this.createHTML();
  }

  public createHTML(): void {
    const detailsBlock = div(
      { className: styles.details },
      div(
        { className: styles.userName },
        div(
          null,
          span({ className: styles.fieldName }, FIELD_NAME.FIRST_NAME),
          span({ className: styles.userInfo }, this.userInformation.firstName),
        ),
        div(
          null,
          span({ className: styles.fieldName }, FIELD_NAME.LAST_NAME),
          span({ className: styles.userInfo }, this.userInformation.lastName),
        ),
      ),
      div(
        null,
        span({ className: styles.fieldName }, FIELD_NAME.BIRTHDAY),
        span({ className: styles.userInfo }, this.userInformation.dateOfBirth),
      ),
      div(
        null,
        span({ className: styles.fieldName }, FIELD_NAME.EMAIL),
        span({ className: styles.userInfo }, this.userInformation.email),
      ),
    );

    const editButton = new Button({ textContent: 'Edit', type: 'submit' });
    editButton.disable();

    this.append(detailsBlock, editButton);
  }
}
