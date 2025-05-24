export const SEARCH_SORT_TEXT = {
  ORDER: 'ORDER:',
  SEARCH_IN: (categoryName: string) => `Search in ${categoryName}`,
  SORT_BY: 'SORT BY:',
} as const;

export const INPUT_SORT_PROPS = {
  NAME: { label: 'Name', name: 'sort-field' },
  PRICE: { label: 'Price', name: 'sort-field' },
} as const;
