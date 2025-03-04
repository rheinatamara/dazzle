require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", require("./routers"));
app.listen(port, () => {
  console.log("running on port", port);
});
