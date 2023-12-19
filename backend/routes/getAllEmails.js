const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

router.use(cors());

router.get("/getallemails", (req, res, next) => {
  db.query("select email from users", [], (error, data) => {
    if (error) res.json({ msg: "error" });
    else res.json(data);
  });
});

module.exports = router;
