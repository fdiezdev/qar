const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const chalk = require("chalk");
const passport = require("passport");
//const map = require("leaflet");
//const lrm = require("leaflet-routing-machine");

const { database } = require("./keys");

// bios
const app = express();
require("./lib/passport");

// config
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(session({
  secret: "nodemysqlsecret",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// routing

app.use(require("./routes/"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));
app.use("/api", require("./routes/api"));

// publics
app.use(express.static(path.join(__dirname, "public")));

// start
app.listen(app.get("port"), () => {
  console.log(
    chalk.bgGreen.bold("Server Status: OK | On Port: " + app.get("port"))
  );
});
