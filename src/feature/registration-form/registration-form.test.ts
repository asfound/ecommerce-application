import { RegistrationFormView } from './registration-form.view';

const registrationFormView = new RegistrationFormView();

test('registrationFormView should be defined', () => {
  expect(registrationFormView).toBeDefined();
});

test('registrationFormView should be instance of RegistrationFormView', () => {
  expect(registrationFormView).toBeInstanceOf(RegistrationFormView);
});
