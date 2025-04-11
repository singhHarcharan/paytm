const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

// Send every request to the main router
app.use("api/v1", mainRouter);

// listen on port 3000
app.listen(3000);


