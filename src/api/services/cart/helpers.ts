import type { MyCartDraft } from '@commercetools/platform-sdk';

export const createCartDraft = (): MyCartDraft => {
  return { currency: 'USD', deleteDaysAfterLastModification: 1 };
};
