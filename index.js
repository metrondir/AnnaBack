const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

const cors = require("cors");

const compression = require("compression");

connectDb();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(compression());

app.use("/api/storeCards", require("./routes/storeCards"));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
