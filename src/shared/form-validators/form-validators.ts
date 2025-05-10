import type { ValidatorFunction } from './types';

import { EMAIL_VALIDATION_ERROR, VALIDATION_ERROR } from '../constants/constants';

export const validateEmailFormat: ValidatorFunction = (value) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@.]{2,}$/;
  return emailRegex.test(value) ? null : EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT;
};

export const validateNoSpaces: ValidatorFunction = (value) => {
  const hasLeadingOrTrailingSpaces = value !== value.trim();
  const hasSpaces = value.includes(' ');
  return hasLeadingOrTrailingSpaces || hasSpaces ? VALIDATION_ERROR.WHITESPACES : null;
};

export const validateRequired: ValidatorFunction = (value) => {
  return value.length === 0 ? VALIDATION_ERROR.REQUIRED : null;
};

export const validateMinLength = (length: number) => {
  return (value: string): null | string => {
    const currentLength = value.trim().length;
    return currentLength < length ? VALIDATION_ERROR.MIN_LENGTH(length, currentLength) : null;
  };
};

export const validateHasUppercase: ValidatorFunction = (value) => {
  return /[A-Z]/.test(value) ? null : VALIDATION_ERROR.HAS_UPPERCASE;
};

export const validateHasLowercase: ValidatorFunction = (value) => {
  return /[a-z]/.test(value) ? null : VALIDATION_ERROR.HAS_LOWERCASE;
};

export const validateHasDigit: ValidatorFunction = (value) => {
  return /\d/.test(value) ? null : VALIDATION_ERROR.HAS_DIGIT;
};

export const validateOnlyEnglishLetters: ValidatorFunction = (value) => {
  return /^[a-zA-Z0-9]+$/.test(value) ? null : VALIDATION_ERROR.ONLY_ENGLISH_LETTERS;
};
