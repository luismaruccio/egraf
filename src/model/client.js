const database = require('../database/mariadb'); 


async function alreadyExistsByCPF(cpf) {
    const query = `
    SELECT
        count(*) as qtd
    FROM
        clients
    WHERE
        cpf = ? and
        enable = 1 `;

    const parms = Object.assign({}, [cpf]);

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [count, meta] = await queryResult;
        return count.qtd
    } catch (error) {
        console.log(error)
    }

}

async function insert(client) {
    const query = `
    INSERT INTO clients 
    (
        name,
        cpf,
        street,
        number,
        city,
        states,
        complement,
        tellNumber,
        email,
        company
    ) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const parms = Object.assign({}, client)
    console.log(parms)
    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }
}

async function getById(id) {
    const query = `
    SELECT
        id,
        name,
        cpf,
        street,
        number,
        city,
        states,
        complement,
        tellNumber,
        email,
        company
    FROM
        clients
    WHERE
        id = ?
    `;
    const parms = Object.assign({}, [id])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [client, meta] = await queryResult;
        return client
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
        cpf,
        street,
        number,
        city,
        states,
        complement,
        tellNumber,
        email,
        company
    FROM
        clients
    WHERE
        enable = ?
        ${companyQuery}
    `;
    const parms = Object.assign({}, [1, company])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [clients, meta] = await queryResult;
        return clients
    } catch (error) {
        console.log(error)
    }

}

async function update(id, user) {
    const query = `
    UPDATE clients 
    SET
        name = ?,
        cpf = ?,
        street = ?,
        number = ?,
        city = ?,
        states = ?,
        complement = ?,
        tellNumber = ?,
        email = ?,
        company = ?
    WHERE
        id = ?
    `
    const {name, cpf, street, number, city, states, complement, tellNumber, email, company} = user;
    const parms = Object.assign({}, [name, cpf, street, number, city, states, complement, tellNumber, email, company, id]);

    try {
        const queryResult = await database.executeQuery(query, parms)
        console.log(queryResult)
        return queryResult
    } catch (error) {
        console.log(error)
    }

}

async function falseDelete(id) {
    const query = `
    UPDATE clients
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

module.exports.alreadyExistsByCPF = alreadyExistsByCPF;
module.exports.insert = insert;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = falseDelete;