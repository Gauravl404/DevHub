const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const { cloudinary } = require("../utils/cloudinary");

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

router.post("/team", authorization, async (req, res) => {
  try {
    var data = req.body;
    console.log(data);

    const result = await pool.query(
      "INSERT INTO teams (name,m_id1,total,description,status) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [data.name, req.user, 1, data.description, "available"]
    );
    const team_id = result.rows[0].team_id;

    const results = await pool.query(
      "UPDATE users SET team_id = $1 WHERE user_id = $2;",
      [team_id, req.user]
    );

    res.json("updated team");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.get("/team", authorization, async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM teams  ORDER BY created_at DESC ;"
    );

    res.json(results.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.post("/project", authorization, async (req, res) => {
  try {
    var data = req.body;
    console.log(data);

    const result = await pool.query(
      "INSERT INTO projects (posted_by,title,description,amount,status,duration) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *;",
      [
        req.user,
        data.title,
        data.description,
        data.amount,
        "open",
        data.duration,
      ]
    );
    console.log("posted successfully");

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.get("/projects", authorization, async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM projects  ORDER BY created_at DESC ;"
    );

    res.json(results.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.post("/postfeed", authorization, async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "devhub_posts",
    });

    const userdetail = await pool.query(
      "SELECT first_name FROM users WHERE user_id = $1 ;",
      [req.user]
    );
    const username = userdetail.rows[0].first_name;

    const postdetails = await pool.query(
      "INSERT INTO posts (title,user_id,content,media,likes,total_comments,status) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *;",
      [
        username,
        req.user,
        req.body.message,
        uploadResponse.secure_url,
        0,
        0,
        "online",
      ]
    );
    console.log(postdetails.rows[0]);
    res.json(postdetails.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.get("/postfeed", authorization, async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC ;"
    );

    res.json(results.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
