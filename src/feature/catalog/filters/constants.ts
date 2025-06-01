export const FILTER_PRICE_RANGE_PROPS = {
  title: 'Price range',
  type: 'price-range',
} as const;

export const FILTER_BEST_SELLERS_PROPS = {
  options: [{ label: 'Bestseller', value: true }],
  title: 'Unique offers',
  type: 'checkboxes' as const,
};

export const FILTER_WEIGHT_PROPS = {
  title: 'Weight',
  type: 'checkboxes' as const,
};

export const FILTER_BRAND_PROPS = {
  title: 'Brand',
  type: 'checkboxes' as const,
};

export const FILTER = {
  ALL: 'all',
  BRAND: 'brand',
  WEIGHT: 'weight',
} as const;

export const FILTER_VIEW_TEXT = {
  FILTERS: 'Filters',
};

export const VALID_PRICE_LENGTH = 16;
