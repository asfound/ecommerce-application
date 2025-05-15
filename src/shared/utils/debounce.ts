export function debounce<F extends (...parameters: Parameters<F>) => void>(
  targetFunction: F,
  timeout: number,
) {
  let timeoutID: ReturnType<typeof setTimeout>;

  return function debounced(this: unknown, ...parameters: Parameters<F>): void {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      targetFunction.apply(this, parameters);
    }, timeout);
  };
}
