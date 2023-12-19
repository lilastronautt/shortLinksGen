const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

router.use(cors());

router.post("/signup", (req, res, next) => {
  db.query(
    "insert into users(name,email,password) values(?,?,?)",
    [req.body.name, req.body.email, req.body.password],
    (error, data) => {
      if (error) res.json({ msg: "error" });
      else res.json({ msg: "ok" });
    }
  );
});

module.exports = router;
