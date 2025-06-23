export const SEARCH_SORT_TEXT = {
  ORDER: 'ORDER:',
  SEARCH_IN: (categoryName: string) =>
    categoryName.length > 0 ? `Search in ${categoryName}` : 'Search all products',
  SORT_BY: 'SORT BY:',
} as const;

export const INPUT_SORT_PROPS = {
  NAME: { label: 'Name', name: 'sort-field' },
  PRICE: { label: 'Price', name: 'sort-field' },
} as const;
