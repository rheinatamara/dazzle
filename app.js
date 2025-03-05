require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);
app.get("/check-session", (req, res) => {
  if (req.session.userId) {
    res.send(`Session = ${req.session.userId}`);
  } else {
    res.send("No session");
  }
});
app.use("/", require("./routers"));
app.listen(port, () => {
  console.log("running on port", port);
});
