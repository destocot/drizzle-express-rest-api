import winston from 'winston';
import config from './config';

const logger = winston.createLogger({
  level: config.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    winston.format.timestamp({ format: 'YY:MM:DD' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp} ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
