const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, simple, label, colorize, printf } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
})

const printLogFormat = {
  file: combine(
    label({
      label: "simple login"
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    // combine의 마지막 파라미터는 출력 format (json, simple 등)
    printFormat
  ),
  console: combine(
    colorize(),
    simple()
  )
}

const opts = {
  file: new transports.File({
    filename: "access_winston.log",   
    dirname: "./log",
    level: "info",
    format: printLogFormat.file,
  }),
  console:  new transports.Console({
    level: "info",
    format: printLogFormat.console,
  })
}

const logger = createLogger({
  transports: [opts.file]
});

// 개발 중(dev)인 서버일 경우에만 console 출력
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

module.exports = logger;