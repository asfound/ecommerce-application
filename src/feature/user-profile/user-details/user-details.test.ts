import { UserDetailsView } from './user-details.view';

const userDetailsView = new UserDetailsView();

test('userDetailsView should be defined', () => {
  expect(userDetailsView).toBeDefined();
});

test('userDetailsView should be instance of UserDetailsView', () => {
  expect(userDetailsView).toBeInstanceOf(UserDetailsView);
});
