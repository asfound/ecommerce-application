import type { AppCustomerAddress } from '~/api/services/customer/types';

import { div } from '~/shared/create-element/tags';

import type { Component } from '../../../components/base-component/types';

import { UserAddress } from '../../../components/address/address';
import { BaseComponent } from '../../../components/base-component/base-component';
import { TITLE } from './constants';
import styles from './user-addresses.module.css';

export class UserAddressesView extends BaseComponent implements Component {
  public constructor() {
    super({ tagName: 'div' });
  }

  public createHTML(addressesData: {
    billingAddresses: AppCustomerAddress[];
    shippingAddresses: AppCustomerAddress[];
  }): void {
    const { billingAddresses, shippingAddresses } = addressesData;

    const shippingCol = div(
      { className: styles.addressCol },
      div({ className: styles.title }, TITLE.SHIPPING),
    );
    const billingCol = div(
      { className: styles.addressCol },
      div({ className: styles.title }, TITLE.BILLING),
    );

    if (shippingAddresses.length > 0) {
      for (const address of shippingAddresses) {
        const userAddress = new UserAddress(address);
        shippingCol.append(userAddress.element);
      }
    }

    if (billingAddresses.length > 0) {
      for (const address of billingAddresses) {
        const userAddress = new UserAddress(address);
        billingCol.append(userAddress.element);
      }
    }

    const addressesContainer = div({ className: styles.addresses }, shippingCol, billingCol);

    this.append(addressesContainer);
  }
}
