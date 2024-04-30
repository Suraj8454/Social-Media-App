const express = require("express");
const dotenv = require("dotenv");

const dbconnected = require("./dbConnect");
const authRouter = require("./router/authRouter");
const postrouter = require("./router/postrouter");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const cors = require("cors");

dbconnected();

dotenv.config("./.env");
const app = express();
// middelwear

app.use(express.json());
app.use(morgan("common"));
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin:"http://localhost:3000",
  })
);

app.use("/auth", authRouter);
app.use("/post", postrouter);

app.get("/", (req, res) => {
  res.status(200).send("hii suraj");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`listen on port : ${PORT}`);
});

//v2abU6Dm9WG3dwre
