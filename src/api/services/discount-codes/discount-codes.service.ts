import type { ClientResponse, DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

export class DiscountCodesService {
  private static instance: DiscountCodesService | null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): DiscountCodesService {
    DiscountCodesService.instance ??= new DiscountCodesService(apiRoot);
    return DiscountCodesService.instance;
  }

  public async getDiscountCodes(): Promise<ClientResponse<DiscountCodePagedQueryResponse>> {
    return await this.apiRoot().discountCodes().get().execute();
  }
}
