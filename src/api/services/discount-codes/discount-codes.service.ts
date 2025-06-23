import type { ApiRootGetter } from '~/api/types/types';

import type { AppDiscountCode } from './types';

import { mapToAppDiscountCode } from './mappers';

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

  public async getDiscountCodes(): Promise<AppDiscountCode[]> {
    const response = await this.apiRoot().discountCodes().get().execute();
    return response.body.results.map((code) => mapToAppDiscountCode(code));
  }
}
