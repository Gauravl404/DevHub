const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

//routes

//sign up

router.post("/register", async (req, res) => {
  try {
    //1. destructure the req.body {name, email,password}

    const { name, email, password, teamId, type } = req.body;

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
      "INSERT INTO users (full_name,mail_id,password,team_id,type) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [name, email, bycryptPassword, teamId, type]
    );

    //5. generate the jwt token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
