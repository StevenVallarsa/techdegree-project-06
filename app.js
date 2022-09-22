const express = require("express");
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

app.get("/project/:projectId", (req, res) => {
  let { projectId } = req.params;
  res.render("project", { project: projects[projectId] });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  console.log(err);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  console.log(err.message, err.status);
  next();
});

app.listen(port, () => console.log(`This application is running on localhost:${port}`));
