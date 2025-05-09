export const EMAIL_VALIDATION_ERROR = {
  INCORRECT_FORMAT: 'Please enter email in the correct format (e.g., user@example.com)',
  WHITESPACES: 'Email must not contain white spaces',
} as const;

export const VALIDATION_ERROR = {
  HAS_DIGIT: 'Must contain at least one digit (0–9).',
  HAS_LOWERCASE: 'Must contain at least one lowercase letter (a–z).',
  HAS_UPPERCASE: 'Must contain at least one uppercase letter (A–Z).',
  MIN_LENGTH: (required: number, current: number) =>
    `Minimum required length is ${required.toString()} characters. You entered ${current.toString()}`,
  ONLY_ENGLISH_LETTERS: 'Only English letters (A–Z, a–z) are allowed.',
  REQUIRED: 'Field is required',
} as const;

export const REQUIRED_PASSWORD_LENGTH = 8;
