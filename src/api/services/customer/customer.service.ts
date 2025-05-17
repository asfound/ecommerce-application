import type {
  Customer,
  MyCustomerChangePassword,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/ts-client';

import type { ApiRootGetter } from '~/api/types/types.ts';

import type {
  AddAddressPayload,
  AddressPayload,
  ChangeAddressPayload,
  PersonalDataPayload,
} from './types.ts';

import {
  createAddAddressAction,
  createChangeAddressAction,
  createRemoveAddressAction,
  createSetDefaultBillingAddressAction,
  createSetDefaultShippingAddressAction,
} from './actions/actions.ts';
import { getPersonalDataUpdateActions } from './helpers/helpers.ts';

export class CustomerService {
  private static instance: CustomerService | null = null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): CustomerService {
    CustomerService.instance ??= new CustomerService(apiRoot);
    return CustomerService.instance;
  }

  public async addAddress(payload: AddAddressPayload): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [createAddAddressAction(payload.address)];

    return this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();
  }

  public async changeAddress(payload: ChangeAddressPayload): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createChangeAddressAction({ address: payload.address, addressId: payload.addressId }),
    ];

    return this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();
  }

  public async changePassword(
    payload: MyCustomerChangePassword,
  ): Promise<ClientResponse<Customer>> {
    return this.apiRoot().me().password().post({ body: payload }).execute();
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    return this.apiRoot().me().get().execute();
  }

  public async removeAddress(payload: AddressPayload): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [createRemoveAddressAction(payload.addressId)];

    return this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();
  }

  public async setDefaultBillingAddress(
    payload: AddressPayload,
  ): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultBillingAddressAction(payload.addressId),
    ];

    return this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();
  }

  public async setDefaultShippingAddress(
    payload: AddressPayload,
  ): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultShippingAddressAction(payload.addressId),
    ];

    return this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();
  }

  public async updatePersonalData(payload: PersonalDataPayload): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = getPersonalDataUpdateActions(
      payload.sourceCustomer,
      payload.editedCustomer,
    );

    return this.apiRoot()
      .me()
      .post({
        body: { actions, version: payload.sourceCustomer.version },
      })
      .execute();
  }
}
