const express = require("express");
const { render } = require("pug");
const { projects } = require("./data.json");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:projectId", (req, res, next) => {
  let { projectId } = req.params;
  if (projects[projectId]) {
    res.render("project", { project: projects[projectId] });
  } else {
    const err = new Error("That project does not exist");
    err.status = 404;
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error("That path or file does not exist");
  err.status = 404;
  // console.log(err.message);
  next(err);
});

app.use((err, req, res, next) => {
  console.log(`${err.message}:  ERROR ${err.status}`);
  res.redirect("/");
});

app.listen(port, () => console.log(`This application is running on localhost:${port}`));
