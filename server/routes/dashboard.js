const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);

    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.post("/post-feed", authorization, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    console.log(req.body);
    console.log(users.rows[0].full_name);
    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
