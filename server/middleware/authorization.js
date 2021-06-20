const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("jwt_token");

    if (!jwtToken) {
      return res.status(403).json({ msg: "authorization denied" });
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    console.log(JSON.stringify(payload));
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
