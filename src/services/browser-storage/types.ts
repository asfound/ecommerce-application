export interface LocalStorageData {
  anonymousTokenStore: TokenStore;
  customerTokenStore: TokenStore;
  loggedIn: boolean;
  refreshToken: string;
}

export type StorageType = 'local' | 'session';

// TODO: replace by SDK type
interface TokenStore {
  expirationTime: number;
  refreshToken?: string;
  token: string;
}
