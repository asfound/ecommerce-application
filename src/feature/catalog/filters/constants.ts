export const FILTER_PRICE_RANGE_PROPS = {
  title: 'Price range',
  type: 'price-range',
} as const;

export const FILTER_BEST_SELLERS_PROPS = {
  options: [{ label: 'Bestseller', value: true }],
  title: 'Unique offers',
  type: 'checkboxes' as const,
};
