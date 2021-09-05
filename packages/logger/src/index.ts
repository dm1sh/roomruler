export const logger = (...args: unknown[]) =>
  console.log(new Date().toISOString() + ":", ...args);
