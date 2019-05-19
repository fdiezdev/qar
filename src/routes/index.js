const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");
router.get("/", (req, res) => {
  res.send("<h1>Hello World</h1><br><a href='/signin/'>Login</a><br><a href='/signup/'>Sign up</a>");
});

router.get("/welcome", isLoggedIn, (req, res) => {
  res.send("<h1>Welcome</h1>");
});

module.exports = router;
