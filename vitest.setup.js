import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/api/msw-mocks/node.ts';

import { vi } from 'vitest';

const store = new Map();

const localStorageMock = {
  getItem: vi.fn((key) => store.get(key) ?? null),
  setItem: vi.fn((key, value) => store.set(key, value)),
  removeItem: vi.fn((key) => store.delete(key)),
  clear: vi.fn(() => store.clear()),
  key: vi.fn((index) => Array.from(store.keys())[index] ?? null),
  get length() {
    return store.size;
  },
};

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('sessionStorage', localStorageMock);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
