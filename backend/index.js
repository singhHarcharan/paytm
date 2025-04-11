const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

// Send every request to the main router
app.use("/api/v1", mainRouter);

// listen on port 3000
app.listen(3000);


