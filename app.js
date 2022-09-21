const express = require("express");
const { projects } = require("./data.json");

const app = express();

app.use("/static", express.static("public"));

app.set("view engine", "pug");
