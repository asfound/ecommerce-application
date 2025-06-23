export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isBigInt = (value: unknown): value is bigint => {
  return typeof value === 'bigint' && !Number.isNaN(value);
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};
