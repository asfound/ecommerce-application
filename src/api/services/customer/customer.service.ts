import type {
  BaseAddress,
  MyCustomerChangePassword,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types.ts';

import type { AuthService } from '../auth/auth.service.ts';
import type {
  AddAddressPayload,
  AddressPayload,
  AppChangePasswordPayload,
  AppCustomer,
  ChangeAddressPayload,
  PersonalDataPayload,
} from './types.ts';

import {
  createAddAddressAction,
  createAddBillingAddressIdAction,
  createAddShippingAddressIdAction,
  createChangeAddressAction,
  createRemoveAddressAction,
  createRemoveBillingAddressIdAction,
  createRemoveShippingAddressIdAction,
  createSetDefaultBillingAddressAction,
  createSetDefaultShippingAddressAction,
} from './actions/actions.ts';
import { getPersonalDataUpdateActions } from './helpers/helpers.ts';
import { mapToAppCustomer } from './mappers.ts';

export class CustomerService {
  private static instance: CustomerService | null = null;

  private readonly apiRoot;

  private readonly authService: AuthService;

  private constructor(apiRoot: ApiRootGetter, authService: AuthService) {
    this.apiRoot = apiRoot;
    this.authService = authService;
  }

  public static getInstance(apiRoot: ApiRootGetter, authService: AuthService): CustomerService {
    CustomerService.instance ??= new CustomerService(apiRoot, authService);
    return CustomerService.instance;
  }

  public async addAddress(payload: AddAddressPayload): Promise<AppCustomer> {
    const key = crypto.randomUUID();

    const address: BaseAddress = { ...payload.address, key };

    const actions: MyCustomerUpdateAction[] = [createAddAddressAction(address)];

    if (payload.type === 'billing') {
      actions.push(createAddBillingAddressIdAction({ key }));
    }

    if (payload.type === 'shipping') {
      actions.push(createAddShippingAddressIdAction({ key }));
    }

    if (payload.default && payload.type === 'billing') {
      actions.push(createSetDefaultBillingAddressAction({ key }));
    }

    if (payload.default && payload.type === 'shipping') {
      actions.push(createSetDefaultShippingAddressAction({ key }));
    }

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async changeAddress(payload: ChangeAddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createChangeAddressAction({ address: payload.address, addressId: payload.addressId }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async changePassword(payload: AppChangePasswordPayload): Promise<AppCustomer> {
    const appCustomerData = await this.getCustomer();

    const changePasswordPayload: MyCustomerChangePassword = {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      version: appCustomerData.version,
    };

    const response = await this.apiRoot()
      .me()
      .password()
      .post({ body: changePasswordPayload })
      .execute();

    this.authService.logout();

    await this.authService.login({
      email: appCustomerData.email,
      password: payload.newPassword,
    });

    return mapToAppCustomer(response.body);
  }

  public async copyToBilling(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createAddBillingAddressIdAction({
        id: payload.addressId,
      }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async copyToShipping(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createAddShippingAddressIdAction({
        id: payload.addressId,
      }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async getCustomer(): Promise<AppCustomer> {
    const response = await this.apiRoot().me().get().execute();

    return mapToAppCustomer(response.body);
  }

  public async removeAddress(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [createRemoveAddressAction(payload.addressId)];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async setDefaultBillingAddress(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultBillingAddressAction({ id: payload.addressId, key: payload.addressKey }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async setDefaultShippingAddress(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createSetDefaultShippingAddressAction({ id: payload.addressId, key: payload.addressKey }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async unsetDefaultBillingAddress(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createRemoveBillingAddressIdAction(payload.addressId),
      createAddBillingAddressIdAction({ id: payload.addressId }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async unsetDefaultShippingAddress(payload: AddressPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = [
      createRemoveShippingAddressIdAction(payload.addressId),
      createAddShippingAddressIdAction({ id: payload.addressId }),
    ];

    const response = await this.apiRoot()
      .me()
      .post({ body: { actions, version: payload.customerVersion } })
      .execute();

    return mapToAppCustomer(response.body);
  }

  public async updatePersonalData(payload: PersonalDataPayload): Promise<AppCustomer> {
    const actions: MyCustomerUpdateAction[] = getPersonalDataUpdateActions(
      payload.sourceCustomer,
      payload.editedCustomer,
    );

    const response = await this.apiRoot()
      .me()
      .post({
        body: { actions, version: payload.sourceCustomer.version },
      })
      .execute();

    return mapToAppCustomer(response.body);
  }
}
