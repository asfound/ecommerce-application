export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// other predicates to be added
