import type { StorageType } from './types';

export class BrowserStorageService<TData> {
  private readonly keyPrefix: string;

  private readonly storage: Storage;

  public constructor({ keyPrefix, storageType }: { keyPrefix: string; storageType: StorageType }) {
    this.storage = storageType === 'local' ? globalThis.localStorage : globalThis.sessionStorage;

    this.keyPrefix = keyPrefix;
  }

  public clear(): void {
    this.storage.clear();
  }

  public getItem<TKey extends keyof TData>(key: TKey): unknown {
    const storageValue = this.storage.getItem(this.getKey(key.toString()));

    if (!storageValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(storageValue);

    return parsedValue;
  }

  public removeItem<TKey extends keyof TData>(key: TKey): void {
    this.storage.removeItem(this.getKey(key.toString()));
  }

  public setItem<TKey extends keyof TData>(key: TKey, value: TData[TKey]): void {
    this.storage.setItem(this.getKey(key.toString()), JSON.stringify(value));
  }

  private getKey(key: string): string {
    return `${this.keyPrefix}-${key}`;
  }
}

export const localStorageService = new BrowserStorageService({
  keyPrefix: 'TEST', // TODO: replace by UUID
  storageType: 'local',
});
