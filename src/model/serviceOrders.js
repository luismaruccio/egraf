const database = require('../database/mariadb'); 
const utils = require('../helper/utils');

async function insert(serviceOrders) {
    const query = `
    INSERT INTO serviceOrders
    (
        client,
        user,
        description,
        requestDate,
        deliveryDate,
        totalPrice,
        status,
        paymentStatus,
        company
    ) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const {client, user, description, requestDate, deliveryDate, totalPrice, status, paymentStatus, company} = serviceOrders;
    const parms = Object.assign({}, [client, user, description, requestDate, deliveryDate, totalPrice, status, paymentStatus, company])
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
        client,
        user,
        description,
        requestDate,
        deliveryDate,
        totalPrice,
        status,
        paymentStatus,
        company
    FROM
        serviceOrders
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
        client,
        user,
        description,
        requestDate,
        deliveryDate,
        totalPrice,
        status,
        paymentStatus,
        company
    FROM
    serviceOrders
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

async function update(id, serviceOrders) {
    const query = `
    UPDATE serviceOrders
    SET
        client = ?,
        user = ?,
        description = ?,
        requestDate = ?,
        deliveryDate = ?,
        totalPrice = ?,
        status = ?,
        paymentStatus = ?,
        company = ?
    WHERE
        id = ?`
        const {client, user, description, requestDate, deliveryDate, totalPrice, status, paymentStatus, company} = serviceOrders;
        const parms = Object.assign({}, [client, user, description, requestDate, deliveryDate, totalPrice, status, paymentStatus, company, id])
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
    UPDATE serviceOrders
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

async function treatServiceOrdersValues(serviceOrdersFromDB){

    var serviceOrders = serviceOrdersFromDB.map(function(serviceOrder){
        return {
                    id: serviceOrder.id,
                    client: serviceOrder.client,
                    user: serviceOrder.user,
                    description: serviceOrder.description,
                    requestDate: utils.ParseDateFormat(serviceOrder.requestDate),
                    deliveryDate: serviceOrder.deliveryDate == undefined ? null : utils.ParseDateFormat(serviceOrder.deliveryDate),
                    totalPrice:  utils.ParseNumberToBRLocale(serviceOrder.totalPrice, true),
                    status: serviceOrder.status,
                    paymentStatus: serviceOrder.paymentStatus,
                    company: serviceOrder.company
                }
    });

    return serviceOrders;
}

module.exports.insert = insert;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = falseDelete;
module.exports.treatServiceOrdersValues = treatServiceOrdersValues;