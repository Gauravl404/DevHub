const express = require("express");
const app = express();
const cors = require("cors");

//middleware
//app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//routes

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
