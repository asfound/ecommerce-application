import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';

import { BUTTON_TEXT } from '~/shared/constants/constants';
import { button, div } from '~/shared/create-element/tags';

import type { Component } from '../../../components/base-component/types';

import { UserAddress } from '../../../components/address/address';
import { BaseComponent } from '../../../components/base-component/base-component';
import { TITLE } from './constants';
import styles from './user-addresses.module.css';

export class UserAddressesView extends BaseComponent implements Component {
  private readonly addBillingAddressButton = button({ className: styles.button }, BUTTON_TEXT.ADD);

  private readonly addShippingAddressButton = button({ className: styles.button }, BUTTON_TEXT.ADD);

  public constructor() {
    super({ tagName: 'div' });
  }

  public createHTML(
    addressesData: {
      billingAddresses: AppCustomerAddress[];
      shippingAddresses: AppCustomerAddress[];
    },
    onAddressChange: (payload: AppChangeAddressPayload) => Promise<void>,
  ): void {
    const { billingAddresses, shippingAddresses } = addressesData;

    const shippingCol = div(
      { className: styles.addressCol },
      div(
        { className: styles.colHeader },
        div({ className: styles.title }, TITLE.SHIPPING),
        this.addShippingAddressButton,
      ),
    );
    const billingCol = div(
      { className: styles.addressCol },
      div(
        { className: styles.colHeader },
        div({ className: styles.title }, TITLE.BILLING),
        this.addBillingAddressButton,
      ),
    );

    if (shippingAddresses.length > 0) {
      for (const address of shippingAddresses) {
        const userAddress = new UserAddress(address, onAddressChange);
        shippingCol.append(userAddress.element);
      }
    }

    if (billingAddresses.length > 0) {
      for (const address of billingAddresses) {
        const userAddress = new UserAddress(address, onAddressChange);
        billingCol.append(userAddress.element);
      }
    }

    const addressesContainer = div({ className: styles.addresses }, shippingCol, billingCol);

    this.replaceChildren(addressesContainer);
  }
}
