import type { TokenStore } from '@commercetools/ts-client';

export interface LocalStorageData {
  anonymousTokenStore: TokenStore;
  customerTokenStore: TokenStore;
  loggedIn: boolean;
  refreshToken: string;
}

export type StorageType = 'local' | 'session';
