export const isAttribute = (value: unknown): value is { key: string; label: string } => {
  return (
    value != null &&
    typeof value === 'object' &&
    Reflect.has(value, 'key') &&
    Reflect.has(value, 'label')
  );
};
