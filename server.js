const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) console.log("Unable to append to server.log");
  });
  next();
});

if (false) {
  app.use((req, res, next) => {
    res.render("maintenance.hbs",{
      pageTitle: "Site under maintenance",
      pageContent: "We'll be right back in a minute!"
    })
    // next();
  });
}

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

hbs.registerHelper("capitalize", text => text.toUpperCase());

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home",
    pageContent: "<strong>Lorem ipsum</strong> dolor sit amet."
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About",
    pageContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  });
});

app.get("/bad", (req, res) => {
  res.send({
    status: 404,
    error: "Unable to fulfill request"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
