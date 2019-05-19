const express = require("express");
const router = express.Router();

// POOL = DB CONNECTION
const pool = require("../database");
const api_key = pool.query("SELECT * FROM api_keys WHERE id = '1'", (err, rows, fields) => {
    if (err) 
    {
        res.json(err);
    } else {
        let apikey = rows;
    }
});


router.get("/users/", (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if(err)
        {
            res.json("error");
        } else {
            res.json({users: rows});
        }
    });
});

router.get("/users/:id", (req,res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM users WHERE id = ?", id, (err, rows, fields) => {
        if(err)
        {
            res.json("error");
        } else {
            res.json({user: rows});
        }
    });
});

router.get("/users/email/:email", (req,res) => {
    const { email } = req.params;
    pool.query("SELECT * FROM users WHERE email = ?", [rows], (err, rows, fields) => {
        if(err)
        {
            res.json("error");
        } else {
            res.json({user: rows});
        }
    });
});

/*router.post("/users/add", (req, res) => {
    

    const rows = pool.query("SELECT * FROM users WHERE email = ?", [req.params]);
    if (rows.length > 0) {
        res.json("email already in use");
    } else {
        const add = pool.query("INSERT INTO users VALUES ?", [email, fullname, password]);
        res.json("user added successfully");
    }
});*/

router.get("/links", (req,res) => {
    pool.query("SELECT * FROM driver_av", (err, rows) => {
        if(err)
        {
            res.json(err);
        } else {
            res.json({links: rows});
        }
    });
});

router.get("/links/:id", (req,res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM driver_av WHERE id = ?", [id],(err, rows) => {
        if(err)
        {
            res.json(err);
        } else {
            if (rows.length >= 0) {
                res.json({link: rows});
            } else {
                res.json("Empty object")
            }
        }
    });
});

module.exports = router;