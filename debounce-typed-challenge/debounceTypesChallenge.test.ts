import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import debounce from "./debounceTypedChallenge";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should debounce function calls", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should pass correct arguments", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc("test", 123);

    vi.advanceTimersByTime(500);

    expect(func).toHaveBeenCalledWith("test", 123);
  });

  it("should reset timer on subsequent calls", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    vi.advanceTimersByTime(500);

    debouncedFunc(); // Reset timer
    vi.advanceTimersByTime(500);

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should preserve this context", () => {
    const obj = {
      value: 42,
      method: function () {
        return this.value;
      },
    };

    const result = vi.fn();
    const debouncedMethod = debounce(function (this: typeof obj) {
      result(this.value);
    }, 100);

    obj.method = debouncedMethod as any;

    obj.method();
    vi.advanceTimersByTime(100);

    expect(result).toHaveBeenCalledWith(42);
  });
});
