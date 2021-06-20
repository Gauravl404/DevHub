const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

//routes

//sign up

router.post("/register", validinfo, async (req, res) => {
  try {
    //1. destructure the req.body {name, email,password}

    const { name, email, password, teamId, type, handle } = req.body;

    //2. check if user already exists ? if yes throw error\
    const user = await pool.query("SELECT * FROM users WHERE mail_id = $1", [
      email,
    ]);

    if (user.rowCount !== 0) {
      return res.status(401).send("user already exists");
    }

    //3. bcrypt the user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassword = await bcrypt.hash(password, salt);

    //4. insert the user into the database
    const newUser = await pool.query(
      "INSERT INTO users (full_name,mail_id,password,type,handle_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [name, email, bycryptPassword, type, handle]
    );

    //5. generate the jwt token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//sign in
router.post("/login", validinfo, async (req, res) => {
  try {
    //1. destructure the req.body {name, email,password}

    const { email, password } = req.body;

    //2. check if user already exists ? if no throw error\
    const user = await pool.query("SELECT * FROM users WHERE mail_id = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(401).json("Email or password is incorrect");
    }

    //3. validate the incoming password

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json("Email or password is incorrect");
    }

    //5. generate the jwt token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//verify

router.post("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
