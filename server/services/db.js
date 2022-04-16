const mysql = require('mysql2/promise');
const config = require('../config');

const query = async (sql, param) => {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, param);
    return results;
};

module.exports = {
    query
};
