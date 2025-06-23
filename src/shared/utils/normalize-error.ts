const ERROR_MESSAGE = 'Unexpected error. Try refreshing the page.';

export const normalizeError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(ERROR_MESSAGE);
};
