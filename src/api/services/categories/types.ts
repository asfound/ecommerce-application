import type { CategoryReference } from '@commercetools/platform-sdk';

export interface AppCategory {
  ancestors: CategoryReference[];
  description: string;
  id: string;
  name: string;
}
