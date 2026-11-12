export const debounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
