import type { LocalStorageData } from '~/services/browser-storage/types';

import { BrowserStorageService } from '~/services/browser-storage/browser-storage.service';

export const mockStorage = new Map<string, string>();

class MockBrowserStorageService extends BrowserStorageService<LocalStorageData> {
  public constructor() {
    super({ keyPrefix: 'test', storageType: 'local' });

    this.storage = {
      clear(): void {
        mockStorage.clear();
      },
      getItem(key): null | string {
        return mockStorage.get(key) ?? null;
      },
      key(): null | string {
        return null;
      },
      length: 0,
      removeItem(key): void {
        mockStorage.delete(key);
      },
      setItem(key, value): void {
        mockStorage.set(key, value);
      },
    };
  }
}

export const mockLocalStorageService = new MockBrowserStorageService();
