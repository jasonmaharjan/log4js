let log4js = require("log4js");
let logger = log4js.getLogger();

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p] [%d] %X{url} %X{roleId} %X{employeeId} %m%n %]",
      },
    },
  },
  categories: {
    default: { appenders: ["out"], level: "error" },
  },
});

const connect = () => log4js.connectLogger(log4js.getLogger("out"));

// const renderLog = ({
//   type,
//   errorMsg,
//   url = "",
//   roleId = "",
//   employeeId = "",
// }) => {
//   logger.addContext("url", url);
//   logger.addContext("roleId", roleId);
//   logger.addContext("employeeId", employeeId);

//   if (type === "error") {
//     logger.error(errorMsg);
//   } else {
//     logger.fatal(errorMsg);
//   }

//   //   switch (type) {
//   //     case "warning":
//   //       logger.warning(errorMsg);
//   //       return;
//   //     case "error":
//   //       logger.error(errorMsg);
//   //       return;
//   //     case "fatal":
//   //       logger.fatal(errorMsg);
//   //       return;
//   //     default:
//   //       console.log(errorMsg);
//   //       return;
//   //   }
// };

const addContextToLog = ({ url, roleId, employeeId }) => {
  logger.addContext("url", url);
  logger.addContext("roleId", roleId);
  logger.addContext("employeeId", employeeId);
};

const warning = ({ errorMsg, url, roleId, employeeId }) => {
  addContextToLog({ url, roleId, employeeId });
  logger.warning(errorMsg);
};

const error = ({ errorMsg, url, roleId, employeeId }) => {
  addContextToLog({ url, roleId, employeeId });
  logger.error(errorMsg);
};

const fatalError = ({ errorMsg, url, roleId, employeeId }) => {
  addContextToLog({ url, roleId, employeeId });
  logger.fatal(errorMsg);
};

module.exports = { connect, warning, error, fatalError };
