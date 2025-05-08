import type { TokenStore } from '@commercetools/ts-client';

export interface LocalStorageData {
  anonymous: TokenStore;
  customer: TokenStore;
  loggedIn: boolean;
}

export type StorageType = 'local' | 'session';
