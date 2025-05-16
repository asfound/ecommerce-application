import type {
  BaseAddress,
  Customer,
  MyCustomerChangePassword,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/ts-client';

import type { ApiRootGetter } from '~/api/types/types.ts';

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

  public async addAddress(payload: {
    address: BaseAddress;
    customerVersion: number;
  }): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [createAddAddressAction(payload.address)];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return response;
  }

  public async changeAddress(payload: {
    address: BaseAddress;
    addressId: string;
    customerVersion: number;
  }): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createChangeAddressAction({ address: payload.address, addressId: payload.addressId }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return response;
  }

  public async changePassword(
    payload: MyCustomerChangePassword,
  ): Promise<ClientResponse<Customer>> {
    const response = await this.apiRoot().me().password().post({ body: payload }).execute();

    return response;
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    const response = await this.apiRoot().me().get().execute();

    return response;
  }

  public async removeAddress(payload: {
    addressId: string;
    customerVersion: number;
  }): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [createRemoveAddressAction(payload.addressId)];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return response;
  }

  public async setDefaultBillingAddress(payload: {
    addressId: string;
    customerVersion: number;
  }): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultBillingAddressAction(payload.addressId),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return response;
  }

  public async setDefaultShippingAddress(payload: {
    addressId: string;
    customerVersion: number;
  }): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultShippingAddressAction(payload.addressId),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return response;
  }

  public async updatePersonalData(
    sourceCustomer: Customer,
    editedCustomer: Customer,
  ): Promise<ClientResponse<Customer>> {
    const actions: MyCustomerUpdateAction[] = getPersonalDataUpdateActions(
      sourceCustomer,
      editedCustomer,
    );

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: sourceCustomer.version } })
      .execute();

    return response;
  }
}
