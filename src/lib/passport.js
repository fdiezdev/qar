const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

// SignIn

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.fullname));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'That email does not exists.'));
  }
}));

// SignUp

passport.use("local.signup",new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const ask = await pool.query('SELECT id, email FROM users WHERE email = ?', [email]);
  
  if (ask.length > 0) {
    return done(null, false, req.flash('message', 'Ese correo ya está en uso.'));
  } else {
    const { fullname } = req.body;
    const role = "0";

    let newUser = {
      email,
      password,
      fullname,
      role
    };

    // Password Hashing
    newUser.password = await helpers.encryptPassword(password);

    console.log("Rows: " + ask);
    // Saving in the Database
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    console.log("Result: " + result[0]);
    newUser.id = result.insertId;
    return done(null, newUser);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});