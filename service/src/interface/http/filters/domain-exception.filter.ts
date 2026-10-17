import {
  Catch,
  HttpException,
  NotFoundException,
  type ArgumentsHost,
  type ExceptionFilter
} from "@nestjs/common";
import type { Response } from "express";
import { NotImplementedError } from "../../../application/shared/not-implemented-error.js";
import {
  ConflictError,
  DomainError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableError
} from "../../../domain/shared/errors.js";
import { HttpError } from "../http-error.js";

function errorName(err: unknown): string | null {
  return err instanceof Error ? err.name : null;
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unexpected server error";
}

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(err: unknown, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    if (res.headersSent) {
      return;
    }

    if (err instanceof NotImplementedError || errorName(err) === "NotImplementedError") {
      res.status(501).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof UnauthorizedError || errorName(err) === "UnauthorizedError") {
      res.status(401).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof NotFoundError || errorName(err) === "NotFoundError") {
      res.status(404).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof ConflictError || errorName(err) === "ConflictError") {
      res.status(409).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof UnprocessableError || errorName(err) === "UnprocessableError") {
      res.status(422).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof DomainError || errorName(err) === "DomainError") {
      res.status(400).json({ error: { message: errorMessage(err) } });
      return;
    }

    if (err instanceof NotFoundException) {
      res.status(404).json({ error: { message: "Not found" } });
      return;
    }

    if (err instanceof HttpException) {
      const status = err.getStatus();
      const body = err.getResponse();
      const message =
        typeof body === "string"
          ? body
          : typeof body === "object" &&
              body !== null &&
              "message" in body &&
              typeof (body as { message: unknown }).message === "string"
            ? (body as { message: string }).message
            : errorMessage(err);
      if (status >= 500) {
        console.error(err);
      }
      res.status(status).json({
        error: { message: status === 500 ? "Internal server error" : message }
      });
      return;
    }

    const status =
      err instanceof HttpError
        ? err.status
        : typeof err === "object" &&
            err !== null &&
            "status" in err &&
            typeof (err as { status: unknown }).status === "number"
          ? (err as { status: number }).status
          : 500;

    if (status >= 500) {
      console.error(err);
    }

    res.status(status).json({
      error: {
        message: status === 500 ? "Internal server error" : errorMessage(err)
      }
    });
  }
}
