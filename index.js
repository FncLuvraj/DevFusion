const express = require("express");
const app = express();
const { dbConnect } = require("./Database/database");
const routes = require("./Routes/routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

dbConnect()
  .then(() => {
    console.log("connected to the database");
    app.listen(process.env.PORT, () => {
      console.log("app is listening on port no", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("error connecting to the database", error.message);
  });

// app.use("/", (req, res) => {
//   res.send("response from the server");
// });
