import type { ApiRootGetter } from '~/api/types/types';

import type { AppCategory } from './types';

import { EXPAND_PATH } from './constants';
import { mapToAppCategories } from './mappers';

export class CategoriesService {
  private static instance: CategoriesService | null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): CategoriesService {
    CategoriesService.instance ??= new CategoriesService(apiRoot);
    return CategoriesService.instance;
  }

  public async getCategories(): Promise<AppCategory[]> {
    const response = await this.apiRoot()
      .categories()
      .get({ queryArgs: { expand: EXPAND_PATH.ANCESTORS } })
      .execute();

    return mapToAppCategories(response.body.results);
  }
}
