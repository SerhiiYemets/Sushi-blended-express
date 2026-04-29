import pino from 'pino-http';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino(
  isProduction
    ? {
        level: 'info',
      }
    : {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
          },
        },
      }
);
