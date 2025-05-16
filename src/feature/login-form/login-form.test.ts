import { LoginFormView } from './login-form.view';

const loginForm = new LoginFormView();

test('loginForm should be defined', () => {
  expect(loginForm).toBeDefined();
});

test('loginForm should be instance of LoginFormView', () => {
  expect(loginForm).toBeInstanceOf(LoginFormView);
});
