export const logger = {
  info(message: string) {
    console.log(message);
  },
  error(err: unknown) {
    console.error(err);
  }
};
