import type { FilterOption } from '~/components/filter/filter';

import { createStore } from '~/shared/store/create-store';

export interface FiltersState {
  brandOptions: FilterOption[];
  weightOptions: FilterOption[];
}

const initialState: FiltersState = {
  brandOptions: [],
  weightOptions: [],
};

export const filtersStore = createStore(initialState);
