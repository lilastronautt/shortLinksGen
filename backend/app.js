const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signUp");
const getAllEmailsRouter = require("./routes/getAllEmails");
const linkGenRouter = require("./routes/linkGenerator");
const linkRouter = require("./routes/linkRouter");
const getAllLinks = require("./routes/getAllLinks");
const getAnalytics = require("./routes/getAnalytics");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", loginRouter);
app.use("/", signUpRouter);
app.use("/", getAllEmailsRouter);
app.use("/", linkGenRouter);
app.use("/", getAllLinks);
app.use("/", linkRouter);
app.use("/", getAnalytics);

app.listen(3000);
