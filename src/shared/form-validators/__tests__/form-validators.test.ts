import { EMAIL_VALIDATION_ERROR, VALIDATION_ERROR } from '~/shared/constants/constants';

import * as validators from '../form-validators';

test('validateEmailFormat should return null for correct email formats', () => {
  expect(validators.validateEmailFormat('test-1@test.com')).toBeNull();
  expect(validators.validateEmailFormat('test-2@test.co')).toBeNull();
  expect(validators.validateEmailFormat('test-3@test.ru')).toBeNull();
  expect(validators.validateEmailFormat('test-4@test.de')).toBeNull();
  expect(validators.validateEmailFormat('test-5@test.by')).toBeNull();
});

test('validateEmailFormat should return error message for incorrect email formats', () => {
  expect(validators.validateEmailFormat('test-1@test')).toBe(
    EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT,
  );
  expect(validators.validateEmailFormat('test-2-test.co')).toBe(
    EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT,
  );
  expect(validators.validateEmailFormat('@test.de')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
  expect(validators.validateEmailFormat('test-5')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
});

test('validateNoSpaces should return null for values without spaces', () => {
  expect(validators.validateNoSpaces('a')).toBeNull();
  expect(validators.validateNoSpaces('ab')).toBeNull();
  expect(validators.validateNoSpaces('abc')).toBeNull();
  expect(validators.validateNoSpaces('abcd')).toBeNull();
  expect(validators.validateNoSpaces('abcde')).toBeNull();
});

test('validateNoSpaces should return error message for values with spaces', () => {
  expect(validators.validateNoSpaces('a ')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validators.validateNoSpaces(' ab')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validators.validateNoSpaces('a b c')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validators.validateNoSpaces(' abcd ')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validators.validateNoSpaces('a b c d e')).toBe(VALIDATION_ERROR.WHITESPACES);
});

test('validateRequired should return null for non empty string', () => {
  expect(validators.validateRequired('a')).toBeNull();
});

test('validateRequired should return error message for empty string', () => {
  expect(validators.validateRequired('')).toBe(VALIDATION_ERROR.REQUIRED);
});

test('validateMinLength should return null for string with valid length', () => {
  const REQUIRED_LENGTH = 5;

  expect(validators.validateMinLength(REQUIRED_LENGTH)('abcdef')).toBeNull();
});

test('validateMinLength should return error message for string with invalid length', () => {
  const REQUIRED_LENGTH = 5;
  const STRING_LENGTH = 2;

  expect(validators.validateMinLength(REQUIRED_LENGTH)('ab')).toBe(
    VALIDATION_ERROR.MIN_LENGTH(REQUIRED_LENGTH, STRING_LENGTH),
  );
});

test('validateHasUppercase should return null for valid string', () => {
  expect(validators.validateHasUppercase('ABCDEF')).toBeNull();
});

test('validateHasUppercase should return error message for invalid string', () => {
  expect(validators.validateHasUppercase('abcdef')).toBe(VALIDATION_ERROR.HAS_UPPERCASE);
});

test('validateHasLowercase should return null for valid string', () => {
  expect(validators.validateHasLowercase('abcdef')).toBeNull();
});

test('validateHasLowercase should return error message for invalid string', () => {
  expect(validators.validateHasLowercase('ABCDEF')).toBe(VALIDATION_ERROR.HAS_LOWERCASE);
});

test('validateHasDigit should return null for valid string', () => {
  expect(validators.validateHasDigit('abcdef1')).toBeNull();
});

test('validateHasDigit should return error message for invalid string', () => {
  expect(validators.validateHasDigit('ABCDEF')).toBe(VALIDATION_ERROR.HAS_DIGIT);
});

test('validateOnlyEnglishLetters should return null for valid string', () => {
  expect(validators.validateOnlyEnglishLetters('abcdef1')).toBeNull();
});

test('validateOnlyEnglishLetters should return error message for invalid string', () => {
  expect(validators.validateOnlyEnglishLetters('фыв')).toBe(VALIDATION_ERROR.ONLY_ENGLISH_LETTERS);
});

test('validateMinAge should return null for valid age', () => {
  const AGE = 21;

  expect(validators.validateMinAge(AGE)('2000-01-01')).toBeNull();
});

test('validateMinAge should return error message for invalid age', () => {
  const AGE = 21;

  expect(validators.validateMinAge(AGE)('2024-01-01')).toBe(VALIDATION_ERROR.MIN_AGE);
});

test('validateDatalistValue should return null for valid value', () => {
  expect(validators.validateDatalistValue(['a', 'b', 'c'])('a')).toBeNull();
});

test('validateDatalistValue should return error message for invalid value', () => {
  expect(validators.validateDatalistValue(['a', 'b', 'c'])('e')).toBe(VALIDATION_ERROR.LIST_VALUE);
});
