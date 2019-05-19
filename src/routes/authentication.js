const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Shortened
router.get("/login", (req, res) => {
  res.redirect("/signin");
});

// SignIn
router.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: '/links',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// SignUp

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", passport.authenticate("local.signup", {
  successRedirect: '/welcome',
  failureRedirect: '/signup',
  failureFlash: true
}));

// LogOut

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
