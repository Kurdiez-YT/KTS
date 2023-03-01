interface RetryOptions {
  maxRetries?: number;
  retryIntervalMs?: number;
}

export async function runWithRetry<T>(
  closure: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxRetries = 5, retryIntervalMs = 5000 } = options;
  let numRetries = 0;
  while (true) {
    try {
      const result = await closure();
      return result;
    } catch (error) {
      numRetries++;
      if (numRetries > maxRetries) {
        throw error;
      }
      const jitterMs = Math.random() * retryIntervalMs;
      await delay(retryIntervalMs + jitterMs);
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
