const express = require("express");
const Logger = require("./log4js");

const app = express();

const PORT = 6969;

app.use(Logger.connect());

app.use("/", (req, res, next) => {
  try {
    res.send("Wello Horld");
    throw new Error("Error doing smthing");
  } catch (error) {
    Logger.error({
      type: "error",
      errorMsg: error?.message,
      url: "/",
      roleId: 1111,
      employeeId: 2222,
    });
  }
  return next();
});

app.use("/test", (req, res, next) => {
  try {
    res.send("Testing Wello Horld");
    throw new Error("Fatal Error doing smthing else");
  } catch (error) {
    Logger.fatalError({
      type: "fatal",
      errorMsg: error?.message,
      url: "/test",
      roleId: 1,
      employeeId: 2,
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error connecting PORT", PORT);
  }
});
