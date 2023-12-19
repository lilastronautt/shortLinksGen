const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./dbConn");

const useragent = require("express-useragent");

const requestIp = require("request-ip");

router.use(cors());
router.use(useragent.express());

router.get("/:linkrouter", async (req, res, next) => {
  console.log(req.ip);
  const visitInfo = {
    timestamp: new Date(),
    ip: requestIp.getClientIp(req),
    browser: req.useragent.browser,
    os: req.useragent.os,
    device: req.useragent.platform,
  };

  try {
    // Fetch location data from ip-api.com based on the visitor's IP address
    const response = await fetch(`http://ip-api.com/json/${visitInfo.ip}`);
    const locationData = await response.json();

    // if (locationData.status === "success") {
    visitInfo.location = {
      country: locationData.country,
      region: locationData.regionName,
      city: locationData.city,
    };
    // }
  } catch (error) {
    console.error("Error fetching location:", error);
  }

  db.query(
    "insert into linkAnalytics values(?,?)",
    [req.params.linkrouter, JSON.stringify(visitInfo)],
    (error, data) => {
      console.log(data);
    }
  );

  db.query(
    "select  originalurl from linksmap where shorturl = ?",
    [req.params.linkrouter],
    (error, data) => {
      res.redirect(data?.[0]?.originalurl);
    }
  );
});

module.exports = router;
