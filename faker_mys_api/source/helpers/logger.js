const winston = require('winston');

const { combine, timestamp, printf } = winston.format;

// eslint-disable-next-line no-shadow
const logFormat = printf(({ level, message, timestamp }) => `[${timestamp}] (${level}): ${message}`);

const logTransports = {
    console: new winston.transports.Console(),
};

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [logTransports.console],
});

// Set Timezone
process.env.TZ = 'America/Los_Angeles';

// Set Log Level
logger.info(`Log Level in env: ${process.env.LOG_LEVEL}`);
logTransports.console.level = process.env.LOG_LEVEL;
logger.info(`Log Level currently set to: ${logTransports.console.level}`);

module.exports = logger;