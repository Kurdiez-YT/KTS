import { runWithRetry } from '@src/commons/util/runWithRetry';

describe('runWithRetry', () => {
  it('should return the result of the closure if it succeeds on the first try', async () => {
    const result = await runWithRetry(() => Promise.resolve('success'));
    expect(result).toEqual('success');
  });

  it('should retry the closure until it succeeds and return the result', async () => {
    const successfulResult = 'success';
    const closure = jest
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce(successfulResult);

    const result = await runWithRetry(closure, {
      maxRetries: 3,
      retryIntervalMs: 0,
    });
    expect(result).toEqual(successfulResult);
    expect(closure).toHaveBeenCalledTimes(3);
  });

  it('should throw an error if the closure fails after reaching the maximum number of retries', async () => {
    const closure = jest.fn().mockRejectedValue(new Error());

    await expect(
      runWithRetry(closure, { maxRetries: 3, retryIntervalMs: 0 }),
    ).rejects.toThrow();
    expect(closure).toHaveBeenCalledTimes(4);
  });
});
