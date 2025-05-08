import type { TokenStore } from '@commercetools/ts-client';

export interface LocalStorageData {
  anonymous: TokenStore;
  customer: TokenStore;
  loggedIn: boolean;
  refreshToken: string;
}

export type StorageType = 'local' | 'session';
