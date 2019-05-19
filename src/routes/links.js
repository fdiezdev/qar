const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { isLoggedIn } = require('../lib/auth');
// POOL = DB CONNECTION
const pool = require("../database");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { from_place, to_place, description } = req.body;
  const newLink = {
    from_place,
    to_place,
    description
  };
  await pool.query("INSERT INTO driver_av set ?", [newLink]);
  req.flash("success", "Tu ruta se creó correctamente");
  res.redirect("/links/");
});

router.get("/", isLoggedIn, async (req, res) => {
  const routes = await pool.query("SELECT * FROM driver_av WHERE hidden = '1'");
  console.log(routes);
  res.render("links/list", { routes: routes });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM driver_av WHERE ID = ?", [id]);
  res.redirect("/links");
  console.log(chalk.bgYellow("Deleted route:" + id));
});

// Maps 
router.get("/map/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const route = await pool.query("SELECT * FROM driver_av WHERE id = ?", [id]);
  res.render("links/map", { route: route });
});

module.exports = router;
