export class NotImplementedError extends Error {
  constructor(useCase: string) {
    super(`${useCase} is not implemented yet.`);
    this.name = "NotImplementedError";
  }
}
