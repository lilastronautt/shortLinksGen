const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "217.21.76.101",
  user: "u494108913_shortlinks",
  password: "Amaan@123",
  database: "u494108913_shortlinks",
});

module.exports = {
  query: (querytext, params, callback) => {
    pool.query(querytext, params, callback);
  },
};
