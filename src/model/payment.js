const database = require('../database/mariadb'); 
const utils = require('../helper/utils');

async function insert(payment) {
    const query = `
    INSERT INTO payment
    (
        description,
        user,
        entryExit,
        date,
        serviceOrder,
        amount,
        company
    ) 
    VALUES(?, ?, ?, ?, ?, ?, ?)`
    const parms = Object.assign({}, payment)
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
        user,
        description,
        entryExit,
        date,
        serviceOrder,
        amount,
        company,
        enable
    FROM
        payment
    WHERE
        id = ?
    `;

    const parms = Object.assign({}, [id])

    try {
        const queryResult = await database.executeQuery(query, parms);
        const [result, meta] = await queryResult;
        return result
    } catch (error) {
        console.log(error)
    }

}

async function getAll(company = 0) {
    const companyQuery = company > 0 ? "and company = ?" : "";

    const query = `
    SELECT
        id,
        user,
        description,
        entryExit,
        date,
        serviceOrder,
        amount,
        company
    FROM
        payment
    WHERE
        enable = ?
        ${companyQuery}
    `;
    const parms = Object.assign({}, [1, company])

    try {
        const queryResult = await database.executeQuery(query, parms);
        return queryResult
    } catch (error) {
        console.log(error)
    }

}

async function treatPaymentsValues(paymentsFromDB){

    var payments = paymentsFromDB.map(function(payment){
        return {
                    id: payment.id,
                    user: payment.user,
                    description: payment.description,
                    entryExit: payment.entryExit,
                    date: utils.ParseDateFormat(payment.date),
                    serviceOrder: payment.serviceOrder,
                    amount: utils.ParseNumberToBRLocale(payment.amount, true),
                    company: payment.company,
                }
    });

    return payments;
}

async function update(id, payment) {
    const query = `
    UPDATE payment
    SET
        description = ?,
        user = ?,
        entryExit = ?,
        date = ?,
        serviceOrder = ?,
        amount = ?,
        company = ?
    WHERE
        id = ?`
    const {description, user, entryExit, date, serviceOrder, amount, company} = payment;
    const parms = Object.assign({}, [description, user, entryExit, date, serviceOrder, amount, company, id])
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
    UPDATE payment
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

module.exports.insert = insert;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.treatPaymentsValues = treatPaymentsValues;
module.exports.update = update;
module.exports.delete = falseDelete;