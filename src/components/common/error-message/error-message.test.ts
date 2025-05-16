import { ErrorMessage } from './error-message';

const errorMessage = new ErrorMessage();

test('errorMessage should be defined', () => {
  expect(errorMessage).toBeDefined();
});

test('errorMessage should be instance of ErrorMessage', () => {
  expect(errorMessage).toBeInstanceOf(ErrorMessage);
});
