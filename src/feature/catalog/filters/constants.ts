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
  options: [
    { label: '250g', value: 'sm' },
    { label: '500g', value: 'md' },
    { label: '1000g', value: 'lg' },
  ],
  title: 'Weight',
  type: 'checkboxes' as const,
};

export const FILTER_BRAND_PROPS = {
  options: [
    { label: 'Timeless', value: 'Timeless' },
    { label: 'Aerobly', value: 'Aerobly' },
    { label: 'Harilo', value: 'Harilo' },
    { label: 'Kinko', value: 'Kinko' },
    { label: 'Kalida', value: 'Kalida' },
    { label: 'Modum', value: 'Modum' },
    { label: 'Xemex', value: 'Xemex' },
    { label: 'Mellow', value: 'Mellow' },
    { label: 'DeepCup', value: 'DeepCup' },
  ],
  title: 'Brand',
  type: 'checkboxes' as const,
};

export const CATEGORY_NAME = {
  ACCESSORIES: 'Accessories',
  ALL: '',
  ARABICA: 'Arabica',
  BLEND: 'Blend',
  BREWING: 'Brewing',
  DARK_ROAST: 'Dark roast',
  DRINKWARE: 'Drinkware',
  GRINDERS: 'Grinders',
  HONEY_PROCESS: 'Honey Process',
  LIGHT_ROAST: 'Light Roast',
  NATURAL_PROCESS: 'Natural Process',
  ROBUSTA: 'Robusta',
  WASHED_PROCESS: 'Washed Process',
} as const;

export const FILTER = {
  ALL: 'all',
  BRAND: 'brand',
  WEIGHT: 'weight',
} as const;

export const FILTER_VIEW_TEXT = {
  FILTERS: 'Filters',
};

export const VALID_PRICE_LENGTH = 16;
