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
