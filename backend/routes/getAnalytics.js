const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

router.use(cors());

router.get("/getlinkanalytics/:shorturl", (req, res, next) => {
  db.query(
    "select data from linkAnalytics where shorturl = ?",
    [req.params.shorturl],
    (error, data) => {
      console.log(data);
      if (error) res.json({ msg: "error" });
      else res.json(data);
    }
  );
});

module.exports = router;
