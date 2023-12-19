const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

router.use(cors());

router.post("/login", (req, res, next) => {
  console.log(req.body);
  db.query(
    "select * from  users where email = ?",
    [req.body.email],
    (error, data) => {
      if (error) res.json({ msg: "error" });
      if (!data.length) res.json({ msg: "no" });
      else {
        if (
          data[0]?.email == req.body?.email &&
          data[0]?.password == req.body?.password
        ) {
          db.query(
            "select id from users where email = ?",
            [req.body.email],
            (error, data) => {
              res.json({ msg: "yes", userId: data[0].id });
            }
          );
        } else res.json({ msg: "no" });
      }
    }
  );
});

module.exports = router;
