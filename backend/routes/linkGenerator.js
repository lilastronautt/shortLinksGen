const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");
const moment = require("moment");
const geoip = require("geoip-lite");
const shortid = require("shortid");

router.use(cors());

router.post("/linkgen", (req, res, next) => {
  const { url } = req.body;
  const shortUrl = shortid.generate();
  const expiresAt = moment().add(48, "hours"); // Set expiration time
  const sqlFormattedDate = expiresAt.format("YYYY-MM-DD HH:mm:ss");
  db.query(
    "insert into linksmap(userId,urlname,originalurl,shorturl,expiresat) values(?,?,?,?,?)",
    [req.body.userId, req.body.urlName, url, shortUrl, sqlFormattedDate],
    (error, data) => {
      if (error) res.json({ msg: "error" });
      else res.json({ msg: "ok" });
    }
  );
});

module.exports = router;
