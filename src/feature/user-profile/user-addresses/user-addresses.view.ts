import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';
import type { AddressFormProperties } from '~/components/new-address-form/new-address-form';

import { NewAddressForm } from '~/components/new-address-form/new-address-form';
import { BUTTON_TITLE } from '~/shared/constants/constants';
import { button, div } from '~/shared/create-element/tags';

import type { Component } from '../../../components/base-component/types';

import { UserAddress } from '../../../components/address/address';
import { BaseComponent } from '../../../components/base-component/base-component';
import { ADD_BUTTON_TEXT, TITLE } from './constants';
import styles from './user-addresses.module.css';

export class UserAddressesView extends BaseComponent implements Component {
  private readonly addBillingAddressButton = button(
    { className: styles.button, title: BUTTON_TITLE.BILLING },
    ADD_BUTTON_TEXT.BILLING,
  );

  private readonly addShippingAddressButton = button(
    { className: styles.button, title: BUTTON_TITLE.SHIPPING },
    ADD_BUTTON_TEXT.SHIPPING,
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
    onShippingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
    onBillingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
  ): void {
    const { billingAddresses, shippingAddresses } = addressesData;

    const shippingCol = this.createShippingAddresses(
      shippingAddresses,
      onAddressChange,
      onAddressDeletion,
      onShippingDefaultToggle,
      onBillingDefaultToggle,
    );

    const billingCol = this.createBillingAddresses(
      billingAddresses,
      onAddressChange,
      onAddressDeletion,
      onShippingDefaultToggle,
      onBillingDefaultToggle,
    );

    this.addShippingAddressButton.classList.remove(styles.hidden);
    this.addBillingAddressButton.classList.remove(styles.hidden);

    const addressesContainer = div({ className: styles.addresses }, shippingCol, billingCol);

    this.replaceChildren(addressesContainer);
  }

  public setupListeners(
    handlerForShipping: AddressFormProperties['onSubmit'],
    handlerForBilling: AddressFormProperties['onSubmit'],
  ): void {
    this.addShippingAddressButton.addEventListener(
      'click',
      () => {
        this.newShippingAddressHandler(handlerForShipping);
        this.addShippingAddressButton.classList.add(styles.hidden);
      },
      { signal: this.abortController.signal },
    );

    this.addBillingAddressButton.addEventListener(
      'click',
      () => {
        this.newBillingAddressHandler(handlerForBilling);
        this.addBillingAddressButton.classList.add(styles.hidden);
      },
      { signal: this.abortController.signal },
    );
  }

  private createBillingAddresses(
    billingAddresses: AppCustomerAddress[],
    onAddressChange: (payload: AppChangeAddressPayload) => Promise<void>,
    onAddressDeletion: (payload: string) => Promise<void>,
    onShippingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
    onBillingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
  ): HTMLDivElement {
    const billingCol = div({ className: styles.addressCol }, this.billingColHeader);

    if (billingAddresses.length > 0) {
      for (const address of billingAddresses) {
        const userAddress = new UserAddress(
          address,
          onAddressChange,
          onAddressDeletion,
          onShippingDefaultToggle,
          onBillingDefaultToggle,
        );
        billingCol.append(userAddress.element);
      }
    }

    return billingCol;
  }

  private createShippingAddresses(
    shippingAddresses: AppCustomerAddress[],
    onAddressChange: (payload: AppChangeAddressPayload) => Promise<void>,
    onAddressDeletion: (payload: string) => Promise<void>,
    onShippingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
    onBillingDefaultToggle: (payload: string, checked: boolean) => Promise<void>,
  ): HTMLDivElement {
    const shippingCol = div({ className: styles.addressCol }, this.shippingColHeader);

    for (const address of shippingAddresses) {
      const userAddress = new UserAddress(
        address,
        onAddressChange,
        onAddressDeletion,
        onShippingDefaultToggle,
        onBillingDefaultToggle,
      );
      shippingCol.append(userAddress.element);
    }

    return shippingCol;
  }

  private newBillingAddressHandler(handler: AddressFormProperties['onSubmit']): void {
    this.billingColHeader.after(
      new NewAddressForm({
        onCancel: (): void => {
          this.addBillingAddressButton.classList.remove(styles.hidden);
        },
        onSubmit: (...arguments_): Promise<void> => {
          const result = handler(...arguments_);
          this.addBillingAddressButton.classList.remove(styles.hidden);
          return result;
        },
      }).element,
    );
  }

  private newShippingAddressHandler(handler: AddressFormProperties['onSubmit']): void {
    this.shippingColHeader.after(
      new NewAddressForm({
        onCancel: (): void => {
          this.addShippingAddressButton.classList.remove(styles.hidden);
        },
        onSubmit: (...arguments_): Promise<void> => {
          const result = handler(...arguments_);
          this.addShippingAddressButton.classList.remove(styles.hidden);
          return result;
        },
      }).element,
    );
  }
}
