const express = require("express");
const mainRouter = require("./routes/index");

const app = express();

// Send every request to the main router
app.use("api/v1", mainRouter);


