export const EMAIL_VALIDATION_ERROR = {
  INCORRECT_FORMAT: 'Please enter email in the correct format (e.g., user@example.com).',
} as const;

export const VALIDATION_ERROR = {
  HAS_DIGIT: 'Must contain at least one digit (0–9).',
  HAS_LOWERCASE: 'Must contain at least one lowercase letter (a–z).',
  HAS_UPPERCASE: 'Must contain at least one uppercase letter (A–Z).',
  MIN_LENGTH: (required: number, current: number) =>
    `Minimum required length is ${required.toString()} characters. You entered ${current.toString()}.`,
  ONLY_ENGLISH_LETTERS: 'Only English letters (A–Z, a–z) are allowed.',
  REQUIRED: 'Field is required.',
  WHITESPACES: 'Value must not contain white spaces.',
} as const;

export const REQUIRED_PASSWORD_LENGTH = 8;

export const INPUT_TYPE = {
  CHECKBOX: 'checkbox',
  COLOR: 'color',
  DATE: 'date',
  NUMBER: 'number',
  PASSWORD: 'password',
  RADIO: 'radio',
  RESET: 'reset',
  SEARCH: 'search',
  TEXT: 'text',
} as const;

export const PROJECT_NAME = {
  PROJECT: 'Coffee',
  TEAM: 'HUH?',
} as const;

export const TITLE = PROJECT_NAME.TEAM + PROJECT_NAME.PROJECT;
