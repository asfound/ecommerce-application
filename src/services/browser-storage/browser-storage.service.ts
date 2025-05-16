import type { LocalStorageData, StorageType } from './types';

export class BrowserStorageService<TData> {
  protected storage: Storage;

  private readonly keyPrefix: string;

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

export const localStorageService = new BrowserStorageService<LocalStorageData>({
  keyPrefix: 'fdbc6ce7-ff70-43ce-83a1-23be984b7f72',
  storageType: 'local',
});
