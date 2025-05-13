import { EMAIL_VALIDATION_ERROR, VALIDATION_ERROR } from '~/shared/constants/constants';

import {
  validateDatalistValue,
  validateEmailFormat,
  validateHasDigit,
  validateHasLowercase,
  validateHasUppercase,
  validateMinAge,
  validateMinLength,
  validateNoSpaces,
  validateOnlyEnglishLetters,
  validateRequired,
} from '../form-validators';

test('validateEmailFormat should return null for correct email formats', () => {
  expect(validateEmailFormat('test-1@test.com')).toBeNull();
  expect(validateEmailFormat('test-2@test.co')).toBeNull();
  expect(validateEmailFormat('test-3@test.ru')).toBeNull();
  expect(validateEmailFormat('test-4@test.de')).toBeNull();
  expect(validateEmailFormat('test-5@test.by')).toBeNull();
});

test('validateEmailFormat should return error message for incorrect email formats', () => {
  expect(validateEmailFormat('test-1@test')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
  expect(validateEmailFormat('test-2-test.co')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
  expect(validateEmailFormat('@test.de')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
  expect(validateEmailFormat('test-5')).toBe(EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT);
});

test('validateNoSpaces should return null for values without spaces', () => {
  expect(validateNoSpaces('a')).toBeNull();
  expect(validateNoSpaces('ab')).toBeNull();
  expect(validateNoSpaces('abc')).toBeNull();
  expect(validateNoSpaces('abcd')).toBeNull();
  expect(validateNoSpaces('abcde')).toBeNull();
});

test('validateNoSpaces should return error message for values with spaces', () => {
  expect(validateNoSpaces('a ')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validateNoSpaces(' ab')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validateNoSpaces('a b c')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validateNoSpaces(' abcd ')).toBe(VALIDATION_ERROR.WHITESPACES);
  expect(validateNoSpaces('a b c d e')).toBe(VALIDATION_ERROR.WHITESPACES);
});

test('validateRequired should return null for non empty string', () => {
  expect(validateRequired('a')).toBeNull();
});

test('validateRequired should return error message for empty string', () => {
  expect(validateRequired('')).toBe(VALIDATION_ERROR.REQUIRED);
});

test('validateMinLength should return null for string with valid length', () => {
  const REQUIRED_LENGTH = 5;

  expect(validateMinLength(REQUIRED_LENGTH)('abcdef')).toBeNull();
});

test('validateMinLength should return error message for string with invalid length', () => {
  const REQUIRED_LENGTH = 5;
  const STRING_LENGTH = 2;

  expect(validateMinLength(REQUIRED_LENGTH)('ab')).toBe(
    VALIDATION_ERROR.MIN_LENGTH(REQUIRED_LENGTH, STRING_LENGTH),
  );
});

test('validateHasUppercase should return null for valid string', () => {
  expect(validateHasUppercase('ABCDEF')).toBeNull();
});

test('validateHasUppercase should return error message for invalid string', () => {
  expect(validateHasUppercase('abcdef')).toBe(VALIDATION_ERROR.HAS_UPPERCASE);
});

test('validateHasLowercase should return null for valid string', () => {
  expect(validateHasLowercase('abcdef')).toBeNull();
});

test('validateHasLowercase should return error message for invalid string', () => {
  expect(validateHasLowercase('ABCDEF')).toBe(VALIDATION_ERROR.HAS_LOWERCASE);
});

test('validateHasDigit should return null for valid string', () => {
  expect(validateHasDigit('abcdef1')).toBeNull();
});

test('validateHasDigit should return error message for invalid string', () => {
  expect(validateHasDigit('ABCDEF')).toBe(VALIDATION_ERROR.HAS_DIGIT);
});

test('validateOnlyEnglishLetters should return null for valid string', () => {
  expect(validateOnlyEnglishLetters('abcdef1')).toBeNull();
});

test('validateOnlyEnglishLetters should return error message for invalid string', () => {
  expect(validateOnlyEnglishLetters('фыв')).toBe(VALIDATION_ERROR.ONLY_ENGLISH_LETTERS);
});

test('validateMinAge should return null for valid age', () => {
  const AGE = 21;

  expect(validateMinAge(AGE)('2000-01-01')).toBeNull();
});

test('validateMinAge should return error message for invalid age', () => {
  const AGE = 21;

  expect(validateMinAge(AGE)('2024-01-01')).toBe(VALIDATION_ERROR.MIN_AGE);
});

test('validateDatalistValue should return null for valid value', () => {
  expect(validateDatalistValue(['a', 'b', 'c'])('a')).toBeNull();
});

test('validateDatalistValue should return error message for invalid value', () => {
  expect(validateDatalistValue(['a', 'b', 'c'])('e')).toBe(VALIDATION_ERROR.LIST_VALUE);
});
