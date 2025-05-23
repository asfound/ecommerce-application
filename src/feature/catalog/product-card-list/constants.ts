export const PRODUCT_CARD_LIST_TEXT = {
  NOT_FOUND: (searchTerm: string): string =>
    searchTerm.length > 0
      ? `Huh?! No results found for '${searchTerm}'.`
      : 'Huh?! No results found for your request.',
} as const;

export const VIEW_UPDATE_DELAY = 50;
