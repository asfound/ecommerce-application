import { UserPasswordChangeView } from './user-password-change.view';

const userPasswordChangeView = new UserPasswordChangeView();

test('userPasswordChangeView should be defined', () => {
  expect(userPasswordChangeView).toBeDefined();
});

test('userPasswordChangeView should be instance of UserPasswordChangeView', () => {
  expect(userPasswordChangeView).toBeInstanceOf(UserPasswordChangeView);
});
