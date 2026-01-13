export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeOutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeOutId !== null) {
      clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(function () {
      timeOutId = null;
      func.apply(context, args);
    }, wait);
  };
}
