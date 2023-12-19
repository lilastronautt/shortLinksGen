const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

router.use(cors());

router.get("/getalllinks/:userId", (req, res, next) => {
  db.query(
    "select * from linksmap where userId = ?",
    [req.params.userId],
    (error, data) => {
      if (error) res.json({ msg: "error" });
      else res.json(data);
    }
  );
});

module.exports = router;
