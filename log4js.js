let log4js = require("log4js");
let logger = log4js.getLogger();

// log levels: (TRACE, DEBUG, INFO, WARN, ERROR, FATAL)
log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p] [%d] [%X{url}] [%X{roleId}] [%X{employeeId}] %m%n %]",
      },
    },
  },
  categories: {
    default: { appenders: ["out"], level: "debug" },
    main: { appenders: ["out"], level: "warn" },
  },
});

const connect = () => log4js.connectLogger(log4js.getLogger("main"));

const addContextToLog = ({ url = "", roleId = "", employeeId = "" }) => {
  logger.addContext("url", url);
  logger.addContext("roleId", roleId);
  logger.addContext("employeeId", employeeId);
};

const messageToLog = (error = "", msg = "") => {
  if (error) {
    return typeof error === "object" && "message" in error
      ? error.message
      : error;
  }

  return typeof msg === "object" && "message" in msg ? msg.message : msg;
};

function log({ error, type, req, res, message }) {
  try {
    const logMessage = messageToLog(error, message);

    const params = {
      url: req && req.originalUrl,
      roleId: res && res.locals.selectedRole.id,
      employeeId: res && res.locals.employee.id,
    };

    switch (type) {
      case "debug":
        addContextToLog(params);
        logger.debug(logMessage);
        break;

      case "info":
        addContextToLog(params);
        logger.info(logMessage);
        break;

      case "warn":
        addContextToLog(params);
        logger.warn(logMessage);
        break;

      case "error":
        addContextToLog(params);
        logger.error(logMessage);
        break;

      case "fatal":
        addContextToLog(params);
        logger.fatal(logMessage);
        break;

      default:
        console.log(
          typeof error === "object" && "message" in error
            ? error.message
            : error
        );
    }
  } catch (err) {
    console.log(
      typeof error === "object" && "message" in error ? error.message : error
    );
  }
}

module.exports = { connect, log };
