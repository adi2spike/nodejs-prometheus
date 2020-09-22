import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { ErrorRequestHandler, Handler } from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

export const RequestLoggerHandler: Handler = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.json()),
  meta: false,
});

export const ErrorLoggerHandler: ErrorRequestHandler = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
});
