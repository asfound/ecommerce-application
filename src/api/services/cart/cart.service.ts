import type { Cart, ClientResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

import type { AppCartData } from '../products/types';
import type { AddLineItemPayload, RemoveLineItemPayload } from './types';

import { createAddLineItemAction, createRemoveLineItemAction } from './actions';
import { createCartDraft } from './helpers';
import { mapLineItemToAppCartProduct } from './mappers';

export class CartService {
  private static instance: CartService | null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): CartService {
    CartService.instance ??= new CartService(apiRoot);
    return CartService.instance;
  }

  public async addLineItem(payload: AddLineItemPayload): Promise<ClientResponse<Cart>> {
    const actions: MyCartUpdateAction[] = [createAddLineItemAction(payload)];

    const {
      body: { id, version },
    } = await this.getCurrentCart();

    const response = await this.apiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { actions, version } })
      .execute();

    return response;
  }

  public async createCart(): Promise<ClientResponse<Cart>> {
    return await this.apiRoot().me().carts().post({ body: createCartDraft() }).execute();
  }

  public async getActiveCart(): Promise<ClientResponse<Cart>> {
    return await this.apiRoot().me().activeCart().get().execute();
  }

  public async getCartData(): Promise<AppCartData> {
    const cart = await this.getCurrentCart();
    const items = cart.body.lineItems.map((lineItem) => mapLineItemToAppCartProduct(lineItem));

    return {
      items,
      totalLineItemQuantity: cart.body.totalLineItemQuantity ?? 0,
      totalPrice: { default: cart.body.totalPrice.centAmount },
    };
  }

  public async getCurrentCart(): Promise<ClientResponse<Cart>> {
    try {
      return await this.getActiveCart();
    } catch {
      return await this.createCart();
    }
  }

  public async getProductsSkuSet(): Promise<Set<string>> {
    try {
      const cart = await this.getCurrentCart();
      return new Set(cart.body.lineItems.map((item) => item.variant.sku ?? ''));
    } catch {
      return new Set();
    }
  }

  public async removeLineItem(payload: RemoveLineItemPayload): Promise<ClientResponse<Cart>> {
    const actions: MyCartUpdateAction[] = [createRemoveLineItemAction(payload)];

    const {
      body: { id, version },
    } = await this.getCurrentCart();

    const response = await this.apiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { actions, version } })
      .execute();

    return response;
  }
}
