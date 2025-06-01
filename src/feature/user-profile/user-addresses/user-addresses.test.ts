import { UserAddressesView } from './user-addresses.view';

const userAddressesView = new UserAddressesView();

test('userAddressesView should be defined', () => {
  expect(userAddressesView).toBeDefined();
});

test('userAddressesView should be instance of UserAddressesView', () => {
  expect(userAddressesView).toBeInstanceOf(UserAddressesView);
});
