
/**
 * Dependencies
 */
const mariadb = require('mariadb');
const dbConfig = require('../config/mariadb');

/**
 * Start a connection pool in mariadb
 */
const pool = mariadb.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    password: dbConfig.password,
    connectionLimit: dbConfig.connectionLimit,
    compress: dbConfig.compress,
    rowsAsArray: dbConfig.rowsAsArray
});

/**
 * Execute an query against the database
 * @param {string} query
 * @param {array}  binds 
 */
async function executeQuery(query, binds){
    //const binds = Object.values(var); 
    let connection
    try {
        binds = Object.values(binds)
        connection = await pool.getConnection()
        const response = await connection.query(query, binds)
        return response;
    } catch (error) {
        throw error
    } finally {
        if (connection) connection.release()
    }
}
module.exports.executeQuery = executeQuery

/**
 * Stop pool connection
 */
async function endPool(){
    pool.end()
}
module.exports.endPool = endPool