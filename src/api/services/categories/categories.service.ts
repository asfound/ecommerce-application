import type { ApiRootGetter } from '~/api/types/types';

import type { AppCategory } from './types';

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
    const response = await this.apiRoot().categories().get().execute();

    return mapToAppCategories(response.body.results);
  }
}
