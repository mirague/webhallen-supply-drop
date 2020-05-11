import chalk from 'chalk'
import { sendPushNotification } from './pushover.mjs'
import winston from 'winston'

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ 
      level: 'info',
      filename: `./logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 2,
      colorize: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        myFormat,
      ),
    })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.simple(),
  }));
}

export function errorAndPush(...args) {
  logger.originalError(...args)
  sendPushNotification('[Error]', ...args)
}

logger.originalError = logger.error
logger.error = errorAndPush

export default logger