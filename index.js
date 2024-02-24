const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const express = require("express");
const enforce = require("express-sslify");
const compression = require("compression");

connectDb();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(enforce.HTTPS({ trustProtoHeader: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://csm51bg0-3000.euw.devtunnels.ms",
  "https://anna-vilkova-portfolio.vercel.app",
  "https://anna-vilkova-portfolio-mxnks0a06-romans-projects-3a04df7d.vercel.app",
];

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: function (origin, callback) {
      // Check if the origin is in the allowed list or if it's not defined (for non-browser clients)
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//app.use(cors());

app.use(compression());

app.use("/api/storeCards", require("./routes/storeCards"));

const privateKey = fs.readFileSync("./key.pem", "utf8");
const certificate = fs.readFileSync("./cert.pem", "utf8");
const passphrase = "Dima";
const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: passphrase,
};

//const privateKey = fs.readFileSync("./privkeylets.pem", "utf8");
//const certificate = fs.readFileSync("./certlets.pem", "utf8");
//const passphrase = fs.readFileSync("./ssl-dhparams.pem", "utf8");
//const credentials = {
//  key: privateKey,
//  cert: certificate,
//  passphrase: passphrase,
//};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//const express = require("express");
//const dotenv = require("dotenv").config();
//const connectDb = require("./config/dbConnection");
//const { deletePriceCard } = require("./service/cardService");
//const cors = require("cors");

//const compression = require("compression");

//connectDb();

//const port = process.env.PORT || 5000;
//const app = express();
//app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

//app.use(cors());
//app.use(compression());

//app.use("/api/storeCards", require("./routes/storeCards"));
//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});
