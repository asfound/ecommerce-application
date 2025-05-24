import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';
import type { AddressFormProperties } from '~/components/new-address-form/new-address-form';

import { NewAddressForm } from '~/components/new-address-form/new-address-form';
import { BUTTON_TEXT, BUTTON_TITLE } from '~/shared/constants/constants';
import { button, div } from '~/shared/create-element/tags';

import type { Component } from '../../../components/base-component/types';

import { UserAddress } from '../../../components/address/address';
import { BaseComponent } from '../../../components/base-component/base-component';
import { TITLE } from './constants';
import styles from './user-addresses.module.css';

export class UserAddressesView extends BaseComponent implements Component {
  private readonly addBillingAddressButton = button(
    { className: styles.button, title: BUTTON_TITLE.BILLING },
    BUTTON_TEXT.ADD_ADDRESS,
  );

  private readonly addShippingAddressButton = button(
    { className: styles.button, title: BUTTON_TITLE.SHIPPING },
    BUTTON_TEXT.ADD_ADDRESS,
  );

  private readonly billingColHeader = div(
    { className: styles.colHeader },
    div({ className: styles.title }, TITLE.BILLING),
    this.addBillingAddressButton,
  );

  private readonly shippingColHeader = div(
    { className: styles.colHeader },
    div({ className: styles.title }, TITLE.SHIPPING),
    this.addShippingAddressButton,
  );

  public constructor() {
    super({ tagName: 'div' });
  }

  public createHTML(
    addressesData: {
      billingAddresses: AppCustomerAddress[];
      shippingAddresses: AppCustomerAddress[];
    },
    onAddressChange: (payload: AppChangeAddressPayload) => Promise<void>,
    onAddressDeletion: (payload: string) => Promise<void>,
  ): void {
    const { billingAddresses, shippingAddresses } = addressesData;

    const shippingCol = div({ className: styles.addressCol }, this.shippingColHeader);
    const billingCol = div({ className: styles.addressCol }, this.billingColHeader);

    if (shippingAddresses.length > 0) {
      for (const address of shippingAddresses) {
        const userAddress = new UserAddress(address, onAddressChange, onAddressDeletion);
        shippingCol.append(userAddress.element);
      }
    }

    if (billingAddresses.length > 0) {
      for (const address of billingAddresses) {
        const userAddress = new UserAddress(address, onAddressChange, onAddressDeletion);
        billingCol.append(userAddress.element);
      }
    }

    const addressesContainer = div({ className: styles.addresses }, shippingCol, billingCol);

    this.replaceChildren(addressesContainer);
  }

  public setupListeners(handler: AddressFormProperties['onSubmit']): void {
    this.addShippingAddressButton.addEventListener(
      'click',
      () => {
        this.newShippingAddressHandler(handler);
        this.addShippingAddressButton.classList.add(styles.hidden);
      },
      { signal: this.abortController.signal },
    );
  }

  private newShippingAddressHandler(handler: AddressFormProperties['onSubmit']): void {
    this.shippingColHeader.after(
      new NewAddressForm({
        onCancel: (): void => {
          this.addShippingAddressButton.classList.remove(styles.hidden);
        },
        onSubmit: handler,
      }).element,
    );
  }
}
