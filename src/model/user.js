/**
 * Dependencies 
 */
const database = require('../database/mariadb'); 


async function insert(user){
    const query = `
    INSERT INTO users 
    (
        name,
        email,
        password,
        level,
        company
    ) 
    VALUES(?, ?, ?, ?, ?)`
    const parms = Object.assign({}, user)
    console.log(parms)
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getById(id, getPasswords = false) {
    const password = getPasswords ? "passwords," : "";

    const query = `
    SELECT 
        id, 
        name,
        email, 
        ${password}
        level,
        company,
        enable
    FROM
        users
    WHERE
        id = ?`;

    const parms = Object.assign({}, [id])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [user, meta] = await queryResult
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getAll(company = 0) {
    const companyQuery = company > 0 ? "and company = ?" : "";

    const query = `
    SELECT
        id,
        name,
        email,
        level,
        company,
        enable
    FROM
        users
    WHERE
        enable = ?
        ${companyQuery}`;

    const parms = Object.assign({}, [1, company])

    try {
        const queryResult = await database.executeQuery(query, parms);
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function update(id, user){
    const query = `
    UPDATE users
    SET
        name = ?,
        email = ?,
        password = ?,
        level = ?,
        company = ?
    WHERE
        id = ?`
    const {name, email, password, level, company} = user;
    const parms = Object.assign({}, [name, email, password, level, company, id])
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function falseDelete(id){
    const query = `
    UPDATE users
    SET
        enable = 0
    WHERE
        id = ?`
    const parms = Object.assign({}, [id])
    console.log(parms)
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getByEmail(email) {
    const query = `
    SELECT
        id,
        name,
        email,
        password,
        level,
        company,
        enable
    FROM
        users
    WHERE
        email = ? AND
        enable = 1
    LIMIT 1`;

    const parms = Object.assign({}, [email])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [user, meta] = await queryResult;
        return user
    } catch (error) {
        console.log(error)
    }
}

async function hasEmail(email) {
    const query = `
    SELECT
        count(*) as qtd
    FROM
        users
    WHERE
        email = ? and
        enable = 1 
    `;

    const parms = Object.assign({}, [email])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [count, meta] = await queryResult;
        return count.qtd
    } catch (error) {
        console.log(error)
    }
}

module.exports.insertUser = insert
module.exports.updateUser = update
module.exports.deleteUser = falseDelete
module.exports.getUserById = getById
module.exports.getUserByEmail = getByEmail
module.exports.getAllUser = getAll
module.exports.hasEmail = hasEmail
