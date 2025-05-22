import type { AppCustomerAddress } from '~/api/services/customer/types';

import { COUNTRY_CODES } from '~/shared/constants/country-codes';
import { div, span } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './address.module.css';

export class UserAddress extends BaseComponent implements Component {
  private readonly address: AppCustomerAddress;

  public constructor(address: AppCustomerAddress) {
    super({ tagName: 'div' });

    this.address = address;

    this.createHTML();
  }

  public createHTML(): void {
    const countryName =
      Object.entries(COUNTRY_CODES).find(([, value]) => value === this.address.country)?.[0] ?? '';

    const defaultLabel = div(
      { className: styles.defaultLabel },
      this.address.defaultBilling || this.address.defaultShipping ? span(null, 'Default') : null,
    );

    const addressBlock = div(
      { className: styles.address },
      span({ className: styles.addressLine }, this.address.streetName),
      span({ className: styles.addressLine }, `${this.address.city}, ${countryName}`),
      span({ className: styles.addressLine }, this.address.postalCode),
    );

    const editButton = new Button({ textContent: 'Edit', type: 'submit' });
    editButton.disable();

    this.append(defaultLabel, addressBlock, editButton);
  }
}
