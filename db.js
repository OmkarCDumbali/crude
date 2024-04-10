const Pool = require("pg").Pool;

const pool = new Pool({
    user:"obsrv_user",
    host:"localhost",
    database: "obsrv",
    password: "obsrv123",
    port: 5432,
});

module.exports = pool;