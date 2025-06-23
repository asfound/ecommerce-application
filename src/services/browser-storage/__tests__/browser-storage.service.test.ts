import { localStorageService } from '../browser-storage.service';

const mockTokenStore = {
  expirationTime: 0,
  refreshToken: '',
  token: '',
};

beforeEach(() => {
  localStorageService.setItem('loggedIn', true);
  localStorageService.setItem('anonymous', mockTokenStore);
  localStorageService.setItem('customer', mockTokenStore);
});

afterEach(() => {
  localStorageService.clear();
});

test('ls service should return existing values', () => {
  expect(localStorageService.getItem('loggedIn')).toBeTruthy();
  expect(localStorageService.getItem('anonymous')).toEqual(mockTokenStore);
  expect(localStorageService.getItem('customer')).toEqual(mockTokenStore);
});

test('ls service should remove items', () => {
  localStorageService.removeItem('loggedIn');
  localStorageService.removeItem('anonymous');
  localStorageService.removeItem('customer');

  expect(localStorageService.getItem('loggedIn')).toBeNull();
  expect(localStorageService.getItem('anonymous')).toBeNull();
  expect(localStorageService.getItem('customer')).toBeNull();
});
